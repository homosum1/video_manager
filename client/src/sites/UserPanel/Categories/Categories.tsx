import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export interface VideoCollection {
    videoLibraryId: number;
    guid: string;
    name: string;
    videoCount: number;
    totalSize: number;
}


interface CategoriesProps {
    apiKey: string,
    libraryID: string
}

export const Categories = (props: CategoriesProps) => {
    const navigate = useNavigate();
    const {apiKey, libraryID} = props;
    const [totalItems, setTotalItems] = useState(0);
    const [collections, setCollections] = useState<VideoCollection[]>([]);
    const [error, setError] = useState("");
    const [menuDisplayed, setMenuDisplayed] = useState(false);
    const [collectionName, setCollectionName] = useState('');

    const fetchCollections = async () => {

        if ((!libraryID) || (!apiKey)) {
            console.log('returned!');
        }

        const url =
            `https://video.bunnycdn.com/library/${libraryID}/collections?page=1&itemsPerPage=100&orderBy=date&includeThumbnails=false`;
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTotalItems(data.totalItems);

            console.log(data.items);
            setCollections(data.items);

            setError("");

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unexpected error");
            }
        }
    };

    useEffect(() => {
        fetchCollections();
    }, [libraryID]);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const url = `https://video.bunnycdn.com/library/${libraryID}/collections`;
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                AccessKey: apiKey
            },
            body: JSON.stringify({name: collectionName})
        };

        try {
            const res = await fetch(url, options);
            const json = await res.json();
            if (res.ok) {
                setError('');

                // ok
                setMenuDisplayed(false);
                fetchCollections();
            } else {
                setError(json.message || 'Error occurred');
            }
        } catch (err) {
            console.error('error:', err);
            setError('Error occurred');
        }
    };

    const addCatalouge = () => {
        setMenuDisplayed(true);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCollectionName(event.target.value);
    };

    return (
        <div className="mainUserPanel__categories-section">
                <span className="mainUserPanel__categories-section__headline">
                   Twoje katalogi video:
                </span>
            <div className="mainUserPanel__categories-section__headline__small">
                    <span>
                        Aktualnie posiadasz {totalItems} katalogów w bibliotece o id:{" "}
                        {libraryID}.
                    </span>
            </div>

            <div className="mainUserPanel__categories-section__categories">
                {
                    collections.map((collection) => (
                        <div
                            key={collection.guid}
                            onClick={() => navigate(`/collection/${libraryID}/${collection.guid}`)}
                            className="mainUserPanel__categories-section__categories__box mainUserPanel__categories-section__categories__box--collection"
                        >
                            <span className="name">{collection.name}</span>
                            <div className="data-box">
                                <span>liczba video: {collection.videoCount}</span>
                                <span>rozmiar: {(collection.totalSize / 1048576).toFixed(1)} MB</span>
                            </div>
                        </div>
                    ))
                }
                <div
                    onClick={addCatalouge}
                    className="mainUserPanel__categories-section__categories__box mainUserPanel__categories-section__categories__box--add-button">
                    <span>+ nowy katalog</span>
                </div>
            </div>

            {
                menuDisplayed ?
                    <div className="mainUserPanel__categories-section__wrapper">
                        <form className="mainUserPanel__categories-section__wrapper__add-form" onSubmit={handleSubmit}>
                            <div>
                                <div className="mainUserPanel__categories-section__wrapper__add-form__headline">
                            <span>
                              Dodawanie kolekcji
                            </span>
                                    <span onClick={() => setMenuDisplayed(false)} className="close">x</span>
                                </div>

                                <label htmlFor="collectionName">Nazwa kolekcji:</label>
                                <input
                                    type="text"
                                    id="collectionName"
                                    value={collectionName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mainUserPanel__categories-section__wrapper__add-form__button-section">
                                <button type="submit">Dodaj kolekcję</button>
                            </div>
                        </form>
                    </div>
                    : ""
            }
        </div>
    );
};
