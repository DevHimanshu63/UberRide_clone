import React from 'react'
import {Route , Routes} from 'react-router-dom'
import StartTemplate from "./Pages/StartTemplate.jsx"
import UserRegister from './Pages/UserRegister.jsx'
import UserLogin from './Pages/UserLogin.jsx'
import CaptainSignup from './Pages/CaptainSignup.jsx'
import CaptainLogin from './Pages/CaptainLogin.jsx'
import Home from './Pages/Home.jsx'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<StartTemplate />} />
        <Route path="/signup" exact element={<UserRegister />} />
        <Route path="/login" exact element={<UserLogin />} />
        <Route path="/captainsignup" exact element={<CaptainSignup />} />
        <Route path="/captainlogin" exact element={<CaptainLogin />} />
        <Route path="/home" exact element={<Home />} />
      </Routes>
    </div>
  )
}

export default App