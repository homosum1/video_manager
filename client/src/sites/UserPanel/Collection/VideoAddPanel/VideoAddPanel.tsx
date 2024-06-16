import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./videoAddPanel.scss";

interface VideoAddPanelProps {
    setMenuDisplayed: React.Dispatch<React.SetStateAction<boolean>>
}

export const VideoAddPanel = (props: VideoAddPanelProps) => {
  const navigate = useNavigate();

  return (
    <div className="add-video">
      <form className="mainUserPanel__categories-section__wrapper__add-form">
        <div>
          <div className="mainUserPanel__categories-section__wrapper__add-form__headline">
            <span>Dodawanie video</span>
            <span onClick={() => props.setMenuDisplayed(false)} className="close">
              x
            </span>
          </div>
        </div>
        <div className="mainUserPanel__categories-section__wrapper__add-form__button-section">
          <button type="submit">Dodaj video</button>
        </div>
      </form>
    </div>
  );
};
