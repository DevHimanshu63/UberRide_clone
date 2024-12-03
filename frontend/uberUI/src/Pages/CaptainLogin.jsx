import React, { useState } from 'react'
import { Link } from 'react-router-dom';
function CaptainLogin() {
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [captainData , setcaptainData] = useState({});
    const submitHandler=(e)=>{
        e.preventDefault();
        setcaptainData({
            email:email,
            password:password
        })
        setEmail('')
        setPassword('')
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div className="">
      <img
        className="w-20 mb-5"
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        alt=""
      />
      <form action="" onSubmit={submitHandler}>
        <h3 className="text-lg mb-2">what's your Captain's email</h3>
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
          join a fleet?
          <Link to="/captainsignup" className="text-blue-600 ">
            Register as a captain
          </Link>
        </p>
      </form>
    </div>
    <div>
      <Link to='/signup' className="bg-[#d48537] mb-5 flex items-center justify-center text-white mb-7 rounded px-2 py-2  w-full text-lg placeholder:text-base">
        Sign in as User
      </Link>
    </div>
  </div>
  )
}

export default CaptainLogin