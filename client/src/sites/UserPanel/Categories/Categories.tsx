import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface VideoCollection {
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

    const { apiKey, libraryID } = props;

    const [totalItems, setTotalItems] = useState(0);
    const [collections, setCollections] = useState<VideoCollection[]>([]);

    const [error, setError] = useState("");

    const [menuDisplayed, setMenuDisplayed]= useState(false);

    useEffect(() => {
        const fetchCollections = async () => {
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
            if (apiKey && libraryID) {
              const response = await fetch(url, options);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
    
              const data = await response.json();
              setTotalItems(data.totalItems);
    
              console.log(data.items);
              setCollections(data.items);

              setError("");
            }
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError("Unexpected error");
            }
          }
        };
    
        fetchCollections();
    }, [libraryID]);

    const addCatalouge = () => {
        setMenuDisplayed(true);
    }

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
                        <div key={collection.guid} className="mainUserPanel__categories-section__categories__box mainUserPanel__categories-section__categories__box--collection">
                            <span className="name">{collection.name}</span>
                            <div className="data-box">
                              <span>liczba video: {collection.videoCount}</span>
                              <span>rozmiar: {collection.totalSize} MB</span>
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
                    menuDisplayed ? "" : ""
                }
      </div>
    );
};
