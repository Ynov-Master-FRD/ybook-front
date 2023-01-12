import React from 'react';
import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';


import FormRegister from "./views/Login/FormRegister";
import { LoginView } from './views/Login/Login';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<FormRegister/>}/>
            {/* <Route path="/login" element={<LoginView/>}/> */}
        </Routes>
    </div>
  );
}

export default App;
