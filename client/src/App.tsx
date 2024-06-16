import React, { useEffect, useState } from 'react';

import './App.scss';

import { Route, Routes } from 'react-router-dom';

import { MainPage } from './sites/MainPage/MainPage';
import { NotFound } from './sites/NotFound/NotFound';
import { LoginPage } from './sites/Login/loginPage';
import { SignupPage } from './sites/Signup/signupPage';
import { Navbar } from './shared/navbar';
import { AuthProvider } from './AuthContext';
import { UserPanel } from './sites/UserPanel/userPanel';
import { Collection } from './sites/UserPanel/Collection/Collection';
import { VideoPanel } from './sites/UserPanel/Video/Video';


function App() {
  
  function loadGoogleFonts() {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  useEffect(() => {
    loadGoogleFonts();
  }, []);
  
  
  return (
    <div className='App'>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="" element={ <MainPage/>} />
          <Route path="/login" element={ <LoginPage/>} />
          <Route path="/signup" element={ <SignupPage/>} />
          <Route path="/panel" element={ <UserPanel/>} />
          <Route path="/collection/:libraryID/:id" element={ <Collection/>} />
          <Route path="/video/:libraryID/:collectionID/:videoID" element={<VideoPanel/>}/>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
