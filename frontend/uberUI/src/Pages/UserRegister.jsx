import React, { useState } from 'react'
import { Link } from 'react-router-dom';
function UserRegister() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [userData , setuserData] = useState({});
   
    const submitHandler=(e)=>{
        e.preventDefault();
        setuserData({
            fullname:{
            firstName:firstName,
            lastName:lastName
            },
            email:email,
            password:password
        })
        console.log(userData);
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div className="">
      <img
        className="w-20 mb-10"
        src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
        alt=""
      />
      <form action="" onSubmit={submitHandler}>
        <h3 className="text-lg mb-2">what's your Name</h3>
        <div className='flex gap-4 '>
        <input
          className="bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-1/2 text-base placeholder:text-base"
          type="text"
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)}
          name="firstName"
          id="firstName"
          placeholder="first name"
          required
        />
        <input
          className="bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-1/2 text-base placeholder:text-base"
          type="text"
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
          name="lastname"
          id="lastname"
          placeholder="Last name"
          required
        />
        </div>
        <h3 className="text-lg mb-2">what's your email</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
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
          Already have an account?
          <Link to="/login" className="text-blue-600 ">
             Login here
          </Link>
        </p>
      </form>
    </div>
    <div>
      {/* <p className='text-[10px] leading-tight'>By proceeding , you consent to get calls, whatsapp or SMS messages
        , including by automated means, from Uber and its affiliates to the number provided.
      </p> */}
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the  <span className='underline'>Google policy</span> and <span className='underline'>Terms and Service apply</span></p>
    </div>
  </div>
  )
}

export default UserRegister