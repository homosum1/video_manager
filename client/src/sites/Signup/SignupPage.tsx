import {useState} from "react";
import "./signupPage.scss";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";

export const SignupPage = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, email, password}),
                credentials: "include",
            });

            if (response.status === 201) {
                const data = await response.json();
                login();
                navigate("/");
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            setError("Podczas rejestracji wystąpił błąd.");
        }
    };

    return (
        <div className="signup">
            <img src={process.env.PUBLIC_URL + "/birds2.jpg"} alt="Example"/>

            <form onSubmit={handleSubmit}>
                <h2>Rejestracja</h2>

                <div className="spacer"/>
                <input
                    type="text"
                    placeholder="Nazwa użytkownika"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Adres email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p>{error}</p>}
                <button type="submit">Zarejestruj</button>
            </form>
        </div>
    );
};
