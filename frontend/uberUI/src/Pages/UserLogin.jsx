import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import {useNavigate} from "react-router-dom"
import axios from "axios";
function UserLogin() {

    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [userData , setuserData] = useState({});
    const {user , setUser} = useContext(UserDataContext);
    const navigate = useNavigate();
    const submitHandler= async(e)=>{
        e.preventDefault();
        const userData = {
            email:email,
            password:password
        }
        const response =await axios.post(`http://localhost:4000/users/login`, userData)
        console.log(response.data);
        if(response.status === 200){
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home')
        }
        setEmail('')
        setPassword('')
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div className="">
        <img
          className="w-14 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
          alt=""
        />
        <form action="" onSubmit={submitHandler}>
          <h3 className="text-lg mb-2">what's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            id="email"
            placeholder="email@example.com"
            required
          />
          <h3 className="text-lg mb-2">Enter your password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            placeholder="password"
            required
          />
          <button
            className="bg-[#111] text-white mb-7 rounded px-2 py-2  w-full text-lg placeholder:text-base"
            type="submit"
          >
            Login
          </button>
          <p className="text-center">
            New here?
            <Link to="/signup" className="text-blue-600 ">
              Create new account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to='/captainlogin' className="bg-[#4dd76d] mb-5 flex items-center justify-center text-white mb-7 rounded px-2 py-2  w-full text-lg placeholder:text-base">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
