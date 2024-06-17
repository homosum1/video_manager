import "./mainPage.scss";
import {useNavigate} from "react-router-dom";

export const MainPage = () => {
    const navigate = useNavigate();


    return (
        <div className="mainPage">
            <div className="mainPage__text-box">
                <div className="mainPage__text-box__boundry">
                    <div className="mainPage__text-box__boundry__headline-wrapper">
                        <div className="mainPage__text-box__boundry__headline">
                            <span>Wideo Bez Granic</span>
                        </div>
                        <div className="mainPage__text-box__boundry__text">
                            <span>Twórz, edytuj i dziel się swoimi dziełami z łatwością. Dołącz do nas i pozwól, by Twoje filmy mówiły za Ciebie.</span>
                        </div>
                    </div>

                    <div className="mainPage__text-box__boundry__call-to-action">
                        <div className="mainPage__text-box__boundry__call-to-action__headline">
                            <span>Twórz, Zarządzaj, Inspiruj</span>
                        </div>

                        <button onClick={() => navigate('/signup')}>Utwórz konto</button>

                    </div>
                </div>

            </div>

            <img src={process.env.PUBLIC_URL + '/cameraMan.jpg'} alt="Example"/>
        </div>
    )
}