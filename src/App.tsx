import React from 'react';
import logo from './logo.svg';

import './App.scss';
import FormRegister from "./views/Login/FormRegister";
import { Route, Routes } from 'react-router-dom';
import BottomNavBar from './components/shared/BottomNavBar';
import Profil from './views/Profile/Profil';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/register" element={<FormRegister />} />
            <Route path="/profil" element={<Profil />} />
        </Routes>
        <BottomNavBar></BottomNavBar>
    </div>
  );
}

export default App;
