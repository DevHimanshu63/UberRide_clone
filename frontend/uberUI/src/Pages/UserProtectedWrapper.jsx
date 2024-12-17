import React, { useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function UserProtectedWrapper({children}) {
    const {user , setUser } = React.useContext(UserDataContext);
    const [isLoading , setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        if(!token){
            navigate('/login');
        }
        axios.get('http://localhost:4000/users/profile',{
          headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response)=>{
            if(response.status === 200){
                setUser(response.data);
                setIsLoading(false);
            }
          }).catch((err)=>{
            console.log(err);
            localStorage.removeItem('token');
            navigate('/login');
        })
    },[token , navigate])

   

    

    
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper