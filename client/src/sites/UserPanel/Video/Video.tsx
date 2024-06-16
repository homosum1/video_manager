import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useDropzone } from "react-dropzone";

import "./video.scss";

interface VideoPanelProps {

}

export const VideoPanel = (props: VideoPanelProps) => {
  const navigate = useNavigate();

  const { collectionID, libraryID, } = useParams();

  return (
    <div className="video">
     
    </div>
  );
};
