import React from 'react';
import logo from './logo.svg';

import './App.scss';
import FormRegister from "./views/Login/FormRegister";
import { Route, Routes } from 'react-router-dom';
import BottomNavBar from './components/shared/BottomNavBar';
import Profil from './views/Profile/Profil';
import AddPost from './components/shared/AddPost';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/register" element={<FormRegister />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/add-post" element={<AddPost />} />
        </Routes>
        <BottomNavBar></BottomNavBar>
    </div>
  );
}

export default App;
