import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const LogoutFoodPartner = () => {
    const navigate = useNavigate()
    useEffect(()=>{
    axios.get("http://localhost:3030/auth/foodPartner/logout",{withCredentials:true})
    .then(()=> {
        navigate("/");
    })
    },[])
  return (
    <>
    </>
  )
}

export default LogoutFoodPartner
