import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
function VehiclePanel(props) {

  return (
    <div><h5 onClick={()=>props.setVehiclePanel(false)} className="p-3 text-center absolute top-0  w-[93%] flex justify-center items-center"><FaChevronDown className="text-gray-500"/></h5>
    <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
    <div onClick={()=>{props.setConfirmedRidePanel(true)}}
    className="flex border mb-2 active:border-black  rounded-xl w-full p-3 items-center justify-between">
      <img
        className="h-12"
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        alt=""
      />
      <div className="ml-2 w-1/2">
        <h4 className="font-medium text-sm flex items-center">
          UberGo
          <span className="ml-2 flex items-center">
            <FaUser className="mr-1" />4
          </span>
        </h4>

        <h5 className="font-medium text-sm">2 mins away</h5>
        <p className="font-normal text-xs text-gray-600">
          Affordable, compact rides
        </p>
      </div>
      <h2 className="text-lg font-semibold">193.03 Rs</h2>
    </div>

    <div  onClick={()=>{props.setConfirmedRidePanle(true)}} className="flex border mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between">
      <img
        className="h-12"
        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
        alt=""
      />
      <div className="ml-2 w-1/2">
        <h4 className="font-medium text-sm flex items-center">
          Moto
          <span className="ml-2 flex items-center">
            <FaUser className="mr-1" />1
          </span>
        </h4>

        <h5 className="font-medium text-sm">3 mins away</h5>
        <p className="font-normal text-xs text-gray-600">
          Affordable, motorcycle rides
        </p>
      </div>
      <h2 className="text-lg font-semibold">65.03 Rs</h2>
    </div>

    <div  onClick={()=>{props.setConfirmedRidePanel(true)}} className="flex border mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between">
      <img
        className="h-12"
        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        alt=""
      />
      <div className="ml-2 w-1/2">
        <h4 className="font-medium text-sm flex items-center">
          Auto
          <span className="ml-2 flex items-center">
            <FaUser className="mr-1" />2
          </span>
        </h4>

        <h5 className="font-medium text-sm">3 mins away</h5>
        <p className="font-normal text-xs text-gray-600">
          Affordable, motorcycle rides
        </p>
      </div>
      <h2 className="text-lg font-semibold">123.03 Rs</h2>
    </div></div>
  )
}

export default VehiclePanel