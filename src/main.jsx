import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import { Nav } from "./components/Nav.jsx";
import { Notfound } from './components/Notfound.jsx';
import { Report } from './pages/Report.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { Absentees } from './pages/Absentees.jsx';
import { BottomNav } from './components/MobieNav.jsx';
import { UsersComp } from './components/Users/UsersComp.jsx';
import { EditUserPage } from './pages/EditUserPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/report' element={<Report />} />
        <Route path='/absentees' element={<Absentees />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/users' element={<UsersComp />} />
        <Route path='/edituser/:userId' element={<EditUserPage />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  </React.StrictMode>
);