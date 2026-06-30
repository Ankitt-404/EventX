import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/home.jsx'
import AdminDashboard from './pages/adminDashboard.jsx'
import EventsPage from './pages/events.jsx'
import Auth from './pages/Auth.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
