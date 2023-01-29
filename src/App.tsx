import React from "react";

import "./App.scss";
import FormRegister from "./views/Login/FormRegister";

import { Route, Routes } from 'react-router-dom';
import BottomNavBar from './components/shared/Navbar/BottomNavBar';
import Profil from './views/Profile/Profil';
import { MantineProvider } from '@mantine/core';
import Home from './views/Home/Home';
import { NotificationsProvider } from '@mantine/notifications';
import { Friends } from './views/Friends/Friends';
import { Messages } from './views/Conversations/Messages';
import { ConversationProvider } from './providers/ConversationProvider';


function App() {
  return (
    <div className="App">
      <MantineProvider withNormalizeCSS>
        <NotificationsProvider>
          <ModalsProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<FormRegister />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/messages" element={
                <ConversationProvider>
                  <Messages />
                </ConversationProvider>
              } />
            </Routes>
          <BottomNavBar></BottomNavBar>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
