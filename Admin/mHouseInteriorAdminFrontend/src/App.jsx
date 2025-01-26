import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import { RecoilRoot } from 'recoil';
import {jwtDecode} from "jwt-decode";
import ProjectAtId from './pages/ProjectById';


function App() {
  useTokenValidation();
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

function useTokenValidation(){
  useEffect(()=> {
    try{
    const token = localStorage.getItem('token');
    if(token){
      const {exp} = jwtDecode(token);
      const currentTime = Math.floor(Date.now()/1000);
      if (exp < currentTime) {
        console.log("Token has expired. Removing from localStorage.");
        localStorage.removeItem("token");
      }
    }
  }catch (error) {
    console.error("Invalid token. Removing from localStorage.", error);
    localStorage.removeItem("token");
  }
  },[])
}

export default App
