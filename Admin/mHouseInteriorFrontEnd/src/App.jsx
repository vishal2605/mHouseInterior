import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Footer from './components/Footer'
import Projects from './pages/Projects'
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact'
function App() {
   return (
    <div className='bg-slate-50'>
      <ToastContainer/>
      <Router>
      <Navbar/>
        <Routes>
          <Route index path='/' element={<Home/>}></Route>
          <Route index path='/projects' element ={<Projects/>} />
          <Route index path='/services' element={<Services/>}/>
          <Route index path='/about' element={<About/>}/>
          <Route index path='/contact' element={<Contact/>}/>
          <Route index path='/project/:projectId' element={<ProjectAtId/>}></Route>
        </Routes>
      </Router>
      <div className='pt-4'>
        <Footer/>
      </div>
    </div>
  )
}

export default App
