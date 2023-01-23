import React from 'react';


import './App.scss';
import FormRegister from "./views/Login/FormRegister";
import { Route, Routes } from 'react-router-dom';
import BottomNavBar from './components/shared/Navbar/BottomNavBar';
import Profil from './views/Profile/Profil';
import { MantineProvider } from '@mantine/core';
import Home from './views/Home/Home';

function App() {
  return (
    <div className="App">
      <MantineProvider withNormalizeCSS >
        <Routes>
            <Route path="/register" element={<FormRegister />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
        </Routes>
        <BottomNavBar></BottomNavBar>
      </MantineProvider>
    </div>
  );
}

export default App;
