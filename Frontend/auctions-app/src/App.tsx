import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'

import './App.css'

import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import AddAuctionPage from './pages/AddAuctionPage/AddAuctionPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auctions" element={<LandingPage />} />
          <Route path="/add-new-auction" element={<AddAuctionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
