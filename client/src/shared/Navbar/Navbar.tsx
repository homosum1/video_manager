import {useNavigate, useLocation} from "react-router-dom";
import {useAuth} from '../../AuthContext';
import "./navbar.scss";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {isLoggedIn, logout} = useAuth();

    const handleLogout = async () => {
        await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
        logout();
        navigate('/');
    }

    if (location.pathname === "/signup" || location.pathname === "/login") {
        return null;
    }

    return (
        <div className="navbar">
            <div className="logo" onClick={() => navigate("/")}>
            <span
                className="navbar__home material-symbols-outlined"
            >
                videocam
            </span>
                <span className="logo__text">Pai<b>.com</b></span>
            </div>
            <div className="navbar__buttons">
                {
                    isLoggedIn ? <>
                        <button className="empty" onClick={handleLogout}>wyloguj</button>
                        <button className="full" onClick={() => navigate('/panel')}>przejdź do panelu</button>
                    </> : <>
                        <button className="empty" onClick={() => navigate('/login')}>zaloguj</button>
                        <button className="full" onClick={() => navigate('/signup')}>zarejestruj</button>
                    </>
                }
            </div>
        </div>
    )
}
