import React from 'react'
import {BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import Home from '../pages/general/Home'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Profile from '../pages/food-partner/Profile'
import BottomNav from "../Components/BottomNav"
import Saved from "../pages/general/Saved"
import CreateFood from '../pages/food-partner/CreateFood'
import Logout from '../pages/auth/Logout'
import LogoutFoodPartner from '../pages/auth/LogoutFoodPartner'

const AppRoutes = () => {
  return (
    <Router>
         <Routes>
            <Route path="/user/register" element={<UserRegister/>}></Route>
            <Route path="/user/login" element={<UserLogin/>}></Route>
            <Route path="/foodPartner/register" element={<FoodPartnerRegister/>}></Route> 
            <Route path="/foodPartner/login" element={<FoodPartnerLogin/>}></Route>
            <Route path="/create-food" element={<CreateFood/>}></Route>
            <Route path="/" element={<><Home/><BottomNav/></>}></Route>
            <Route path="/saved" element={<><Saved /><BottomNav /></>} />
            <Route path="/foodPartner/:id" element={<Profile/>}></Route>
            <Route path="/user/logout" element={<Logout/>}></Route>
            <Route path="/foodPartner/logout" element={<LogoutFoodPartner/>}></Route>
         </Routes>



    </Router>
  )
}

export default AppRoutes
