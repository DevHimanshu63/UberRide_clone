import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
function UserLogout() {
  const navigate = useNavigate();
  axios.get('http://localhost:4000/users/logout',{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((response)=>{
    if(response.status === 200){
        localStorage.removeItem('token');
        navigate('/login')
    }
  })
  return (
    <div>
        Logout
    </div>
  )
}

export default UserLogout