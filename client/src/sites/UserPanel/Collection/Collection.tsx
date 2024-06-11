import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";


import "./collection.scss";

interface CollectionProps {

}

export const Collection = (props: CollectionProps) => {
    const navigate = useNavigate();

    const { id } = useParams();

    return (
        <div className='userPanel userPanel--long'>
            <div className="collection">
                <div onClick={() => navigate('/panel')} className="collection__navigation">
                    <span className="collection__navigation__text">
                        <span className="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                        <span>Powrót do panelu głównego</span>
                    </span>
                </div>
                <div>
                    <span>Kolekcja: {id}</span>
                </div>
            </div>
        </div>
    );
};
