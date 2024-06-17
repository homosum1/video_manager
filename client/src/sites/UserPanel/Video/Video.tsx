import {useEffect, useState} from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import "./video.scss";
import {Video} from "../Collection/VideoInterface";

interface VideoPanelProps {
}

export const VideoPanel = (props: VideoPanelProps) => {
    const navigate = useNavigate();

    const {libraryID, collectionID, videoID} = useParams();

    const [error, setError] = useState("");
    const [apiKey, setApiKey] = useState("");

    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchApiKey = async () => {
            setError("");
            try {
                const response = await fetch("http://localhost:3000/user/getApiKey", {
                    credentials: "include",
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setApiKey(data.apiKey);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message);
                }
            } catch (err) {
                setError("Unexpected error occurred");
            }
        };

        fetchApiKey();
    }, []);

    const fetchVideo = async () => {
        const url = `https://video.bunnycdn.com/library/${libraryID}/videos/${videoID}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                AccessKey: apiKey,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                setError("Coś poszło nie tak");
            }

            const jsonVideo: Video = await response.json();
            console.log(jsonVideo);

            setVideo(jsonVideo);
        } catch (err) {
            console.error("Error:", err);
            setError("Coś poszło nie tak");
        }
    };

    useEffect(() => {
        if (!apiKey) return;

        fetchVideo();
    }, [apiKey]);


    const handleVideoDelete = async () => {
        const url = `https://video.bunnycdn.com/library/${libraryID}/videos/${videoID}`;
        const options = {
            method: "DELETE",
            headers: {
                accept: "application/json",
                AccessKey: apiKey,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                setError("Coś poszło nie tak");
            }

            const jsonVideo: Video = await response.json();

            navigate(`/collection/${libraryID}/${collectionID}`);
        } catch (err) {
            console.error("Error:", err);
            setError("Coś poszło nie tak");
        }
    };

    return (
        <div className="video">
            <div
                onClick={() => navigate(`/collection/${libraryID}/${collectionID}`)}
                className="collection__navigation"
            >
        <span className="collection__navigation__text">
          <span className="material-symbols-outlined">arrow_back_ios</span>
          <span>Powrót do panelu kolekcji</span>
        </span>
            </div>

            <div className="collection__delete-section">
                <button onClick={handleVideoDelete}>Usuń video</button>
                <span>
          (<b>uwaga:</b> poces ten jest nieodwracalny)
        </span>
            </div>

            <div className="video__stats">
                <span>długość: {video?.length}s.</span>
                <span>kategoria: {video?.category}</span>
                <span>rozdzielczości: {video?.availableResolutions}</span>
                <span>
          enkodowanie:{" "}
                    <b className={`${video?.encodeProgress === 100 ? "green" : "red"}`}>
            {video?.encodeProgress}%
          </b>
        </span>
            </div>

            <div className="videoContainer-wrapper">
                <div className="videoContainer">
                    <div style={{position: "relative", paddingTop: "56.25%"}}>
                        <iframe
                            src={`https://iframe.mediadelivery.net/embed/${libraryID}/${videoID}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`}
                            loading="lazy"
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};
