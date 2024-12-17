import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
function CaptainRiding() {
    const [finishRidepanel , setFinishRidepanel] = useState(false)
    const finishRidePanelRef = useRef(null);

    
    useGSAP(function(){
        if(finishRidepanel){
         gsap.to(finishRidePanelRef.current, {
           transform:'translateY(0)'
         })
        }else{
         gsap.to(finishRidePanelRef.current, {
           transform:'translateY(100%)'
         })
        }
       },[finishRidepanel])

  return (
    <div>
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
        <div className="h-4/5">
          <img
            className="object-cover w-full h-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABLUH3RR9WY4ogN9jIsbV0QTaQWXDvEWW1A&s"
            alt=""
          />
        </div>
        <div 
        onClick={()=>{
            setFinishRidepanel(true)
        }}
        className="h-1/5 relative flex flex-col items-center  justify-between bg-yellow-400">
          <div>
            <h5 className="p-1 text-center w-full">
              <IoIosArrowUp size={'24px'} className="text-gray-500" />
            </h5>
          </div>
          <div className="flex w-full items-center p-6 justify-between bg-yellow-400">
            <h4 className="text-xl font-semibold ">4 KM away</h4>
            <button
            className="w-full text-white bg-green-600 font-semibold rounded-lg p-3 ">
              Complete Ride
            </button>
          </div>
        </div>
      </div>
      <div ref={finishRidePanelRef} className="fixed h-[90%] translate-y-full w-full z-10 bg-white bottom-0  px-3 py-10 pt-12">
         <FinishRide setFinishRidepanel={setFinishRidepanel}/>
      </div>
    </div>
  );
}

export default CaptainRiding;
