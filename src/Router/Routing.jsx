import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../screen/Home';
import Login from '../screen/Login';
import Profile from '../screen/Profile';
import SignUp from '../screen/SignUp';
import UpdateProfile from '../screen/UpdateProfile';

const Pvt_Route = () => {

   let userData = JSON.parse(localStorage.getItem("logInUser"))
   if(userData) {
       return <Profile />
   } else {
      return <Navigate to="/login"/>
   }
}
const HomePvt_Route = () => {
    let userData = JSON.parse(localStorage.getItem("logInUser"))
    if(userData) {
        return <Home />
    } else {
       return <Navigate to="/login"/>
    }
}
const UpdProfPvt_Route = () => {
    let userData = JSON.parse(localStorage.getItem("logInUser"))
    if(userData) {
        return <UpdateProfile />
    } else {
       return <Navigate to="/login"/>
    }
}




const Routing = () => {
    return (
        
        <>
        <Routes>
            <Route path = "/login" element = {<Login />}/>
            <Route index element = {<Login />}/>
            <Route path='/signup' element = {<SignUp />}/>
            <Route path='profile' element = {<Pvt_Route />}/>
             <Route path='/home' element = {<HomePvt_Route />}/>
             <Route path='/updateProfile' element = {<UpdProfPvt_Route />}/>
             <Route path='*' element = {<h1>Error 404! Sorry page not found</h1>} />
        </Routes>
        </>
    );
};


export default Routing;