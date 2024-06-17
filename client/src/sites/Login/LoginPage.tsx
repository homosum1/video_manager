import {useState} from "react";
import "../Signup/signupPage.scss";
import "./loginPage.scss";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";


export const LoginPage = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
                credentials: 'include'
            });

            if (response.status === 200) {
                const data = await response.json();
                login();

                navigate('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            setError('Wystąpił problem podczas logowania.');
        }
    };

    return (
        <div className="signup">
            <img src={process.env.PUBLIC_URL + '/birds2.jpg'} alt="Example"/>

            <form onSubmit={handleSubmit}>
                <h2>Zaloguj się</h2>
                <div className="spacer"/>
                <input
                    type="text"
                    placeholder="Nazwa użytkownika"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p>{error}</p>}
                <button type="submit">Zaloguj</button>
            </form>
        </div>
    )
}