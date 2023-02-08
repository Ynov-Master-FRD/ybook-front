import React from 'react';
import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';


import FormRegister from "./views/Login/FormRegister";
import { LoginView } from './views/Login/Login';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/login" element={<LoginView/>}/>
            <Route path="/register" element={<FormRegister/>}/>
        </Routes>
    </div>
  );
}

export default App;
