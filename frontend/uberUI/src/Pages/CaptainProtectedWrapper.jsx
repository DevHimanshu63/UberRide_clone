import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
function CaptainProtectedWrapper({children}) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {captain ,setCaptain} =useContext(CaptainDataContext);
    const [isLoading , setIsLoading] = useState(true);
    useEffect(() => {
        if(!token){
            navigate('/captainlogin');
        }
        axios.get('http://localhost:4000/captains/profile',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response)=>{
          if(response.status === 200){
              setCaptain(response.data);
              setIsLoading(false);
          }
        }).catch((err)=>{
          console.log(err);
          localStorage.removeItem('token');
          navigate('/captainlogin');
      })
    },[token , navigate])
    
    
  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectedWrapper