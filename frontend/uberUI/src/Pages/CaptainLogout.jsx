import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
function CaptainLogout() {
  const navigate = useNavigate();
  axios.get('http://localhost:4000/captains/logout',{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((response)=>{
    if(response.status === 200){
        localStorage.removeItem('token');
        navigate('/captainlogin')
    }
  })
  return (
    <div>
        Logout
    </div>
  )
}

export default CaptainLogout