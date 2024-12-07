import React, { useRef, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
function CaptainHome() {
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
  const [ridePopUpPanel , setRidePopUpPanel] = useState(true);
  const [ConfirmRidePopUpPanel , setConfirmRidePopUpPanel] = useState(false)


  useGSAP(function(){
    if(ridePopUpPanel){
     gsap.to(ridePopUpPanelRef.current, {
       transform:'translateY(0)'
     })
    }else{
     gsap.to(ridePopUpPanelRef.current, {
       transform:'translateY(100%)'
     })
    }
   },[ridePopUpPanel])

   useGSAP(function(){
    if(ConfirmRidePopUpPanel){
     gsap.to(confirmRidePopUpPanelRef.current, {
       transform:'translateY(0)'
     })
    }else{
     gsap.to(confirmRidePopUpPanelRef.current, {
       transform:'translateY(100%)'
     })
    }
   },[ConfirmRidePopUpPanel])


  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to={"/captain-logout"}
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <IoExitOutline size={"24px"} />
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="object-cover w-full h-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABLUH3RR9WY4ogN9jIsbV0QTaQWXDvEWW1A&s"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
       <CaptainDetails/>
      </div>

      <div ref={ridePopUpPanelRef} className="fixed  translate-y-full w-full z-10 bg-white bottom-0  px-3 py-10 pt-12">
         <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
      </div>

      <div ref={confirmRidePopUpPanelRef} className="fixed h-screen translate-y-full w-full z-10 bg-white bottom-0  px-3 py-10 pt-12">
         <ConfirmRidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
      </div>

      
    </div>
  );
}

export default CaptainHome;
