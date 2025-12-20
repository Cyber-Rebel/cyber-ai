import {  Routes, Route, useNavigate,Navigate} from 'react-router-dom';
import Login from './page/Login.jsx';
import Home from './page/Home.jsx';
import Register from './page/Register.jsx';
import LandingPage from './page/LandingPage.jsx';
import NotFound from './page/NotFound.jsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const Mainrouter = () =>{
    const user = sessionStorage.getItem("user")
    const id = useSelector((state) => state.user.id);
    useEffect(()=>{

        
    },[])

return (

    
       <Routes>
    
      {/* Landing Page - Always accessible */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Chat - Protected Route */}
      <Route path="/chat" element={id ? <Home /> : <Navigate to="/login" />} />
      <Route path="/chat/:chatId" element={id ? <Home /> : <Navigate to="/login" />} />

      <Route path="/login" element={!id ? <Login /> : <Navigate to="/chat" />} />


      <Route path="/register" element={!id ? <Register /> : <Navigate to="/chat" />} />

      {/* 404 Not Found - Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>

);
}
export default Mainrouter;

