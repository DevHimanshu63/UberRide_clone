import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "./VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext  } from "../context/SocketProvider";
import { UserDataContext } from "../context/UserContext";
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
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
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate()

  const {sendMessage , socket} = useContext(SocketContext)
  const {user} = useContext(UserDataContext)

  
  useEffect(()=>{
    sendMessage("join" ,{userType:"user" , userId:user?._id} )
  },[user])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  socket.on('ride-confirmed', ride =>{
    setVehicleFound(false)
    setWaitingForDriver(true) ;
    setRide(ride)
    console.log("ride confirmed data of captain",ride);
  })


  socket.on('ride-started',ride =>{
    setWaitingForDriver(false)
    navigate('/riding' , {state : {ride}})
    console.log('ride-started socket recieved after otp submission',ride);
  })
   
  
  
 

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        "http://localhost:4000/maps/get-suggestions",
        {
          params: {
            input: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
     
    } catch (err) {
      console.log(err);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        "http://localhost:4000/maps/get-suggestions",
        {
          params: {
            input: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
      
    } catch (err) {
      console.log(err);
    }
  };

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

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmedRidePanel) {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmedRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  const findTrip = async () => {
    console.log('findTrip called');
    
    setVehiclePanel(true);
    setPanelOpen(false);
    try{
      const response = await axios.get(`http://localhost:4000/rides/get-fare?pickup=${pickup}&destination=${destination}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log('get-fare',response.data);
      setFare(response.data);
    }catch(err){
      console.log(err);
    }
  }

  const createRide = async () =>{
    try{
      const response = await axios.post('http://localhost:4000/rides/create',{
        pickup,
        destination,
        vehicleType
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      console.log('create ride',response.data);
    }catch(err){
      console.log(err);
    }
  }
  
  
 
    
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
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              // onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] w-full px-12 py-2 text-base rounded-lg mt-5"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              onChange={handleDestinationChange}
              // onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] w-full px-12 py-2 text-base rounded-lg mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="w-full mt-3 text-white bg-black font-semibold rounded-lg p-2"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* car ,auto card  */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 translate-y-full bg-white bottom-0  px-3 py-10 pt-12"
      >
        <VehiclePanel
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVehiclePanel={setVehiclePanel}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>

      {/* confirmed ride page */}
      <div
        ref={confirmedRidePanelRef}
        className="fixed w-full z-10 translate-y-full bg-white bottom-0  px-3 py-6 pt-12"
      >
        <ConfirmedRide
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          
        />
      </div>

      {/* looking for a driver */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 translate-y-full bg-white bottom-0  px-3 py-6 pt-12"
      >
        <LookingForDriver 
        setVehicleFound={setVehicleFound}
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        />
      </div>

      {/* waiting for a driver */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10  bg-white bottom-0  px-3 py-6 pt-12"
      >
        <WaitingForDriver ride={ride}   setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
}

export default Home;
