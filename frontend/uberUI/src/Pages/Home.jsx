import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";

import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "./VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel , setVehiclePanel] = useState(false); 
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField , setActiveField] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

  };


  const handlePickupChange=async()=>{

  }



  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(function(){
   if(vehiclePanel){
    gsap.to(vehiclePanelRef.current, {
      transform:'translateY(0)'
    })
   }else{
    gsap.to(vehiclePanelRef.current, {
      transform:'translateY(100%)'
    })
   }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmedRidePanel){
     gsap.to(confirmedRidePanelRef.current, {
       transform:'translateY(0)'
     })
    }else{
     gsap.to(confirmedRidePanelRef.current, {
       transform:'translateY(100%)'
     })
    }
   },[confirmedRidePanel])

   useGSAP(function(){
    if(vehicleFound){
     gsap.to(vehicleFoundRef.current, {
       transform:'translateY(0)'
     })
    }else{
     gsap.to(vehicleFoundRef.current, {
       transform:'translateY(100%)'
     })
    }
   },[vehicleFound])

   useGSAP(function(){
    if(waitingForDriver){
     gsap.to(waitingForDriverRef.current, {
       transform:'translateY(0)'
     })
    }else{
     gsap.to(waitingForDriverRef.current, {
       transform:'translateY(100%)'
     })
    }
   },[waitingForDriver])
  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="object-cover w-full h-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABLUH3RR9WY4ogN9jIsbV0QTaQWXDvEWW1A&s"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className=" opacity-5 absolute right-6 top-6 text-2xl"
          >
            <IoIosArrowDown />
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form action="" onSubmit={handleSubmit}>
            <div className="line absolute h-16 w-1 top-[43%] left-10 bg-gray-700 rounded-full"></div>
            <input
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
              }}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] w-full px-12 py-2 text-base rounded-lg mt-5"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
              }}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] w-full px-12 py-2 text-base rounded-lg mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel   
          setPanelOpen={setPanelOpen} 
          setVehiclePanel={setVehiclePanel}/>

        </div>
      </div>

{/* car ,auto card  */}
      <div ref={vehiclePanelRef} className="fixed w-full z-10 translate-y-full bg-white bottom-0  px-3 py-10 pt-12">
       <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>

      {/* confirmed ride page */}
      <div ref={confirmedRidePanelRef} className="fixed w-full z-10 translate-y-full bg-white bottom-0  px-3 py-6 pt-12">
       <ConfirmedRide setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound ={setVehicleFound}/>
      </div>

      {/* looking for a driver */}
      <div ref={vehicleFoundRef}  className="fixed w-full z-10 translate-y-full bg-white bottom-0  px-3 py-6 pt-12">
          <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

       {/* waiting for a driver */}
       <div ref={waitingForDriverRef} className="fixed w-full z-10  bg-white bottom-0  px-3 py-6 pt-12">
          <WaitingForDriver  setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  );
}

export default Home;
