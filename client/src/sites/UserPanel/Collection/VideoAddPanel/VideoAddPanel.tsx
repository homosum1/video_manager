import {useState} from "react";
import {
    useNavigate,

} from "react-router-dom";
import {useDropzone} from "react-dropzone";
import "./videoAddPanel.scss";

interface VideoAddPanelProps {
    apiKey: string;
    collectionID: string;
    libraryID: string;
    setMenuDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
    fetchVideos: () => Promise<void>;
}

export const VideoAddPanel = (props: VideoAddPanelProps) => {
    const navigate = useNavigate();
    const {apiKey, collectionID, libraryID} = props;
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const onDrop = (acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    };

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const createVideo = async () => {
        if (!apiKey) return;


        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                'content-type': 'application/json',
                AccessKey: apiKey,
            },
            body: JSON.stringify({title: title, collectionId: collectionID, thumbnailTime: 0})
        };

        try {
            const response = await fetch(
                `https://video.bunnycdn.com/library/${libraryID}/videos`,
                options
            );

            if (!response.ok) {
                console.log('Wystąpił niespodziewany błąd')
            }

            const data = await response.json();

            console.log(data);
            console.log('video zostało utworzone!');
            return data.guid;

        } catch (error) {
            console.error("Błąd podczas tworzenia video:", error);
            setMessage("Błąd podczas tworzenia video:.");
            setUploading(false);
        }
    };

    const uploadVideo = async (videoId: string) => {
        if (!apiKey) return;

        if (!videoId || !file) {
            console.log('Nieprawidłowe video ID lub plik');
            setMessage("Nieprawidłowe video ID lub plik");
            return;
        }

        const url = `https://video.bunnycdn.com/library/${libraryID}/videos/${videoId}`;

        const options = {
            method: "PUT",
            headers: {
                accept: 'application/json',
                AccessKey: apiKey,
            },
            body: file,
        };

        try {
            console.log('Rozpoczęcie uploaudu video');

            const response = await fetch(url, options);

            console.log(response);
            if (!response.ok) {
                console.log('Błąd podczas uploadowania video')
            }

            setMessage("Video zostało wgrane!");

            props.fetchVideos();
            props.setMenuDisplayed(false);
        } catch (error) {
            console.error('Błąd podczas uploadowania video:', error);
            setMessage('Błąd podczas uploadowania video');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUploading(true);
        setMessage("");


        const videoId = await createVideo();
        console.log(videoId);

        if (videoId) {
            await uploadVideo(videoId);
        }
    };

    return (
        <div className="add-video">
            <form onSubmit={handleSubmit} className="add-video__add-form">
                <div>
                    <div className="add-video__add-form__headline">
                        <span>Dodawanie video</span>
                        <span
                            onClick={() => props.setMenuDisplayed(false)}
                            className="close"
                        >
              x
            </span>
                    </div>
                </div>

                <div className="add-video__add-form__wrapper">
                    <label>Nazwa video:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="add-video__add-form__upload_field" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                        {file
                            ? `Wybrany plik: ${file.name}`
                            : "Przeciągnij video lub dodaj je ręcznie"}
                    </p>
                </div>

                <div className="add-video__add-form__button-section">
                    <button type="submit" disabled={uploading}>
                        {uploading ? "Wgrywanie..." : "Dodaj video"}
                    </button>
                </div>
            </form>
        </div>
    );
};
