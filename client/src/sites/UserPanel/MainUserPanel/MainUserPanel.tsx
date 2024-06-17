import React, {ChangeEvent, useEffect, useState} from "react";
import "./mainUserPanel.scss";
import {Categories} from "../Categories/Categories";

interface MainUserPanelProps {
    fetchProfile: () => Promise<void>;
}

export const MainUserPanel = (props: MainUserPanelProps) => {
    const [apiKey, setApiKey] = useState("");
    const [error, setError] = useState("");

    const [libraryID, setLibraryID] = useState("");

    const [apiKeyVisibe, setApiKeyVisible] = useState(false);


    useEffect(() => {
        const fetchApiKey = async () => {
            setError("");
            try {
                const response = await fetch("http://localhost:3000/user/getApiKey", {
                    credentials: "include",
                });

                if (response.status === 200) {
                    const data = await response.json();
                    console.log(apiKey);
                    setApiKey(data.apiKey);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message);
                }
            } catch (err) {
                setError("Unexpected error occurred");
            }
        };

        const fetchLibraryID = async () => {
            setError("");
            try {
                const response = await fetch(
                    "http://localhost:3000/user/getLibraryID",
                    {
                        credentials: "include",
                    }
                );

                if (response.status === 200) {
                    const data = await response.json();

                    setLibraryID(data.libraryID);
                } else {
                    const errorData = await response.json();
                }
            } catch (err) {
                setError("Unexpected error occurred");
            }
        };

        fetchApiKey();
        fetchLibraryID();
    }, []);

    const handleDeleteApiKey = async () => {
        try {
            const response = await fetch("http://localhost:3000/user/deleteApiKey", {
                method: "POST",
                credentials: "include",
            });

            if (response.status === 200) {
                setApiKey("");
                props.fetchProfile();
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            setError("Wystąpił niespodziewany błąd");
        }
    };

    const handleAPIcodeDisplay = () => {
        setApiKeyVisible(!apiKeyVisibe);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLibraryID(e.target.value);
    };

    const handleLibraryIDChange = async () => {
        try {
            const response = await fetch("http://localhost:3000/user/addLibraryID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({libraryID}),
            });

            if (response.status === 200) {
                const data = await response.json();
                props.fetchProfile();
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            setError("Wystapil niespodziewany blad");
        }
    };

    return (
        <div className="mainUserPanel">
            <div className="mainUserPanel__api-key-section">
                <div className="mainUserPanel__api-key-section__api-key">
                    <span>Twój aktualny klucz api:</span>
                    <input
                        type={`${apiKeyVisibe ? "text" : "password"}`}
                        value={apiKey}
                        readOnly
                    />
                    <button
                        className="mainUserPanel__api-key-section__api-key__visisibility-button"
                        onClick={handleAPIcodeDisplay}
                    >
            <span className="material-symbols-outlined">
              {apiKeyVisibe ? "visibility" : "visibility_off"}
            </span>
                    </button>
                    <button
                        className="mainUserPanel__api-key-section__api-key__delete-button"
                        onClick={handleDeleteApiKey}
                    >
                        usuń
                    </button>
                </div>

                <div className="mainUserPanel__api-key-section__api-key">
                    <span>ID należącej do ciebie biblioteki:</span>
                    <input type="text" value={libraryID} onChange={handleInputChange}/>
                    <button
                        className="mainUserPanel__api-key-section__api-key__delete-button"
                        onClick={handleLibraryIDChange}
                    >
                        zapisz zmiany
                    </button>
                </div>
                {error && <p className="error">{error}</p>}
            </div>
            {
                libraryID ?
                    <Categories apiKey={apiKey} libraryID={libraryID}/>
                    :
                    <div className="mainUserPanel__library-info-section">
                        <span className="headline">Już prawie gotowe</span>
                        <span className="text">Wprowadź ID należącej do ciebie biblioteki i zacznij korzystać w pełni z platformy Pai.com</span>
                    </div>
            }
        </div>
    );
};
