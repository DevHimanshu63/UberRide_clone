import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-9 w-full flex justify-between flex-col'>
            <img className='w-14 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
            <div className='bg-white py-5 pb-7 px-5'>
                <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
                <Link to="/login" className='w-full flex items-center justify-center bg-black mt-5 text-white p-3 rounded-sm'>Continue</Link>
            </div>  
        </div>
    </div>
  )
}

export default Home