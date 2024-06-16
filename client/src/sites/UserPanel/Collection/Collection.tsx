import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./collection.scss";
import { VideoCollection } from "../Categories/Categories";
import { Video } from "./VideoInterface";

import { VideoAddPanel } from "./VideoAddPanel/VideoAddPanel";

interface CollectionProps {}

export const Collection = (props: CollectionProps) => {
  const navigate = useNavigate();

  const { libraryID, id } = useParams();

  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [menuDisplayed, setMenuDisplayed] = useState(false);

  const [collection, setCollection] = useState<VideoCollection>();
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchApiKey = async () => {
      setError("");
      try {
        const response = await fetch("http://localhost:3000/user/getApiKey", {
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
        //   console.log(data.apiKey);
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

  const fetchVideos = async () => {
    const url = `https://video.bunnycdn.com/library/${libraryID}/videos?page=1&itemsPerPage=100&orderBy=date`;
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
      const json = await response.json();
      const videos: Video[] = json.items;

      setVideos(videos);
    } catch (err) {
      console.error("Error:", err);
      setError("Coś poszło nie tak");
    }
  };

  useEffect(() => {
    const fetchCollectionData = async () => {
      const url = `https://video.bunnycdn.com/library/${libraryID}/collections/${id}?includeThumbnails=true`;
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
        const json: VideoCollection = await response.json();
        setCollection(json);
      } catch (err) {
        console.log("error");
        setError("Coś poszło nie tak");
      }
    };

    if (apiKey && id && libraryID) {
      fetchCollectionData();
      fetchVideos();
    }
  }, [apiKey]);

  const handleColletionDelete = async () => {
    if (!apiKey) return;

    const url = `https://video.bunnycdn.com/library/${libraryID}/collections/${id}`;
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
        throw new Error("Coś poszło nie tak");
      }

      const json = await response.json();

      // ok
      navigate("/panel");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <div className="userPanel userPanel--long">
        <div className="collection">
          <div
            onClick={() => navigate("/panel")}
            className="collection__navigation"
          >
            <span className="collection__navigation__text">
              <span className="material-symbols-outlined">arrow_back_ios</span>
              <span>Powrót do panelu głównego</span>
            </span>
          </div>
          <div className="collection__delete-section">
            <button onClick={handleColletionDelete}>Usuń katalog</button>
            <span>
              (<b>uwaga:</b> poces ten jest nieodwracalny)
            </span>
          </div>

          <div className="collection__videos">
            <span className="collection__videos__name">
              Informacje o kolekcji: <b>{collection?.name}</b>
            </span>
            <div className="collection__videos__header">
              <span>ilość filmów: {collection?.videoCount}</span>
              <span>
                rozmiar:{" "}
                {collection?.totalSize
                  ? (collection?.totalSize / 1048576).toFixed(1)
                  : ""}
                MB
              </span>
            </div>
            <div className="collection__videos__content">
              {videos.map((video) => (
                <div
                  key={video.guid}
                  className="collection__videos__content__box collection__videos__content__box--collection"
                >
                  <span className="name">{video.title}</span>
                  <div className="data-box">
                    <span>długość: {video.length}s.</span>
                    <span>kategoria: {video.category}</span>
                    <span>rozdzielczości: {video.availableResolutions}</span>
                    <span className="encode">
                      enkodowanie:{" "}
                      <b
                        className={`${
                          video.encodeProgress === 100 ? "green" : "red"
                        }`}
                      >
                        {video.encodeProgress}%
                      </b>
                    </span>
                  </div>
                </div>
              ))}
              <div
                onClick={() => setMenuDisplayed(true)}
                className="collection__videos__content__box collection__videos__content__box--add-button"
              >
                <span>+ Dodaj video</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {menuDisplayed && id !== undefined && apiKey !== undefined && libraryID !== undefined? (
        <VideoAddPanel
          apiKey={apiKey}
          libraryID={libraryID}
          collectionID={id}
          fetchVideos={fetchVideos}
          setMenuDisplayed={setMenuDisplayed}
        />
      ) : (
        ""
      )}
    </>
  );
};
