import React from 'react'
import {Route , Routes} from 'react-router-dom'
import StartTemplate from "./Pages/StartTemplate.jsx"
import UserRegister from './Pages/UserRegister.jsx'
import UserLogin from './Pages/UserLogin.jsx'
import CaptainSignup from './Pages/CaptainSignup.jsx'
import CaptainLogin from './Pages/CaptainLogin.jsx'
import Home from './Pages/Home.jsx'
import UserProtectedWrapper from './Pages/UserProtectedWrapper.jsx'
import UserLogout from './Pages/UserLogout.jsx'
import CaptainHome from './Pages/CaptainHome.jsx'
import CaptainProtectedWrapper from './Pages/CaptainProtectedWrapper.jsx'
import CaptainLogout from './Pages/CaptainLogout.jsx'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<StartTemplate />} />
        <Route path="/signup" exact element={<UserRegister />} />
        <Route path="/login" exact element={<UserLogin />} />
        <Route path="/captainsignup" exact element={<CaptainSignup />} />
        <Route path="/captainlogin" exact element={<CaptainLogin />} />
        <Route path="/home" exact element={
          <UserProtectedWrapper>
              <Home />
           </UserProtectedWrapper>
        } />
          <Route path="/userlogout" exact element={
          <UserProtectedWrapper>
              <UserLogout />
          </UserProtectedWrapper>} />
          <Route path="/captain-home" exact element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
            } />

       <Route path="/captain-logout" exact element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
            } />

      </Routes>
    </div>
  )
}

export default App