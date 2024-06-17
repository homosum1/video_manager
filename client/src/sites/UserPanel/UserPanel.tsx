import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";

import "./userPanel.scss";
import {APIKey} from "./APIKey/APIKey";
import {MainUserPanel} from "./MainUserPanel/MainUserPanel";

export const UserPanel = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [apiKeyPossed, setApiKeyPossesed] = useState(false);


    const fetchProfile = async () => {
        setError('');

        try {
            const response = await fetch('http://localhost:3000/user/profile', {
                credentials: 'include'
            });

            if (response.status === 200) {
                const data = await response.json();
                setUsername(data.username);
                setApiKeyPossesed(data.hasApiKey);
                console.log(data.hasApiKey);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            setError('Wystapil niespodziewany blad');
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);


    return (
        <div className={`userPanel ${apiKeyPossed ? 'userPanel--long' : ''}`}>
            {
                apiKeyPossed ? <MainUserPanel fetchProfile={fetchProfile}/> :
                    <APIKey username={username} fetchProfile={fetchProfile}/>
            }
        </div>
    );
};
