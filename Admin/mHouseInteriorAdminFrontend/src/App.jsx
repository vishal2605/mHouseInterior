import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import { RecoilRoot } from 'recoil';
import ProjectAtId from './pages/ProjectById';


function App() {

  return (
    <div>
      <RecoilRoot>
      <Router>
        <Routes>
          <Route index path='/login' element={<Login/>}></Route>
          <Route index path='/adminDashboard' element={<AdminDashboard/>}></Route>
          <Route index path='/project/:projectId' element={<ProjectAtId/>}></Route>
        </Routes>
      </Router>
      </RecoilRoot>
    </div>
  )
}

export default App
