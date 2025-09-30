import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Logout = () => {
   const navigate = useNavigate()

   useEffect(()=>{
    axios.get("http://localhost:3030/auth/user/logout",{withCredentials:true})
    .then(()=> {
        navigate("/");
    },[])

   })



  return (
   <>
   </>
  )
}

export default Logout
