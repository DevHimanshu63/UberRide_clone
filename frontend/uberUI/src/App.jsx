import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Home from "./Pages/Home.jsx"
import UserRegister from './Pages/UserRegister.jsx'
import UserLogin from './Pages/UserLogin.jsx'
import CaptainSignup from './Pages/CaptainSignup.jsx'
import CaptainLogin from './Pages/CaptainLogin.jsx'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" exact element={<UserRegister />} />
        <Route path="/login" exact element={<UserLogin />} />
        <Route path="/captainsignup" exact element={<CaptainSignup />} />
        <Route path="/captainlogin" exact element={<CaptainLogin />} />
      </Routes>
    </div>
  )
}

export default App