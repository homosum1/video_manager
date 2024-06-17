import {ChangeEvent, FormEvent, useState} from "react";

interface APIKeyProps {
    username: string,
    fetchProfile: () => Promise<void>
}

export const APIKey = (props: APIKeyProps) => {
    const {username} = props;
    const [error, setError] = useState('');
    const [apiKey, setApiKey] = useState('');

    const handleApiKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setApiKey(event.target.value);
    };

    const handleApiKeySubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/user/addApiKey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({apiKey})
            });

            if (response.status === 200) {
                const data = await response.json();
                props.fetchProfile();
                // setMessage(data.message);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            setError('Wystapil niespodziewany blad');
        }
    };


    return (
        <>
            <img src={process.env.PUBLIC_URL + '/cameraMan2.jpg'} alt="Example"/>

            <div className="userPanel__api">
                <form onSubmit={handleApiKeySubmit}>
                    <div className="userPanel__api__name">
                        <span>Witaj {error ? error : username}!</span>
                    </div>
                    <span className="userPanel__api__headline">
                        Podaj klucz api do serwisu <a href="/panel">bunny.net</a>, aby zacząć korzystać z platformy.
                    </span>
                    <div className="userPanel__api__input-form">
                        <input
                            type="text"
                            value={apiKey}
                            onChange={handleApiKeyChange}
                            placeholder="wprowadź swój klucz"
                        />
                        <button type="submit">Zapisz klucz</button>
                    </div>
                </form>
            </div>
        </>
    );
};
