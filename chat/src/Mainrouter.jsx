import {  Routes, Route, useNavigate,Navigate} from 'react-router-dom';
import Login from './page/Login.jsx';
import Home from './page/Home.jsx';
import Register from './page/Register.jsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const Mainrouter = () =>{
    const user = sessionStorage.getItem("user")
    const id = useSelector((state) => state.user.id);
    console.log("user id in main router",id)
    useEffect(()=>{

        
    },[])

return (

    
       <Routes>
      {/* If logged in → Home, else → Login */}
      <Route path="/" element={id ? <Home /> : <Navigate to="/login" />} />

      {/* If not logged in → Login, else → Home */}
      <Route path="/login" element={!id ? <Login /> : <Navigate to="/" />} />

      {/* If not logged in → Register, else → Home */}
      <Route path="/register" element={!id ? <Register /> : <Navigate to="/" />} />
    </Routes>

);
}
export default Mainrouter;

