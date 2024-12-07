import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

function ConfirmedRide(props) {
  return (
    <div>
        <h5 className="p-1 text-center absolute top-0  w-[93%] flex justify-center items-center"><FaChevronDown className="text-gray-500"/></h5>
         <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>
         <div className='flex gap-2 flex-col justify-between items-center'>
            <img className='h-20' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />  
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <FaUserCircle size={'20px'}/>
                    <div>
                        <h3 className='text-lg font-medium'>128/33</h3>
                        <p className='text-sm -mt-1 text-gray-600'>New Delhi , Haryana</p>
                    </div>    
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                   <FaLocationDot size={'20px'} /> 
                    <div>
                        <h3 className='text-lg font-medium'>128/33</h3>
                        <p className='text-sm -mt-1 text-gray-600'>New Delhi , Haryana</p>
                    </div>    
                </div>
                <div className='flex items-center gap-5 p-3 '>
                    <GiTakeMyMoney size={'20px'}/>
                    <div>
                        <h3 className='text-lg font-medium'>128/33</h3>
                        <p className='text-sm -mt-1 text-gray-600'>New Delhi , Haryana</p>
                    </div>    
                </div>
            </div>
            <button 
            onClick={()=>{
                props.setVehicleFound(true)
                props.setConfirmedRidePanel(false)
            }}  
            className='w-full mt-5 text-white bg-green-600 font-semibold rounded-lg p-2'>Confirm</button>
         </div>
    </div>
  )
}

export default ConfirmedRide