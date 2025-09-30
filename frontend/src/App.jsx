import React from 'react'
import { Toaster } from "react-hot-toast";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"

import LandingPage from './pages/LandingPage'

import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/InterviewPrep/InterviewPrep'
import UserProvider from './context/userContext';
const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/interview-prep/:sessionId' element={<InterviewPrep/>}/>
        </Routes>
      </Router>

      <Toaster
      toastOptions={{
        className: "",
        style:{
          fontSize: "13px",
        },
      }}
      
      />

      
    </div>
    </UserProvider>
  )
}

export default App
