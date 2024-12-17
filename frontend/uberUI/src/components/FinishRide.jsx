import React from "react";
import { Link  , useNavigate} from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import axios from "axios";
function FinishRide(props) {
  const navigate = useNavigate();
  const endRide = async () => {
    console.log("endRide called");
    
    try{
      const response = await axios.post(
        `http://localhost:4000/rides/end-ride`,
        {
          rideId: props.rideData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      
      if (response.status === 200) {
        navigate("/captain-home");
      }
    }
    catch(error){
      console.log(error);
    }
  };
  return (
    <div>
      <h5
        onClick={() => {
          props.setFinishRidepanel(false);
        }}
        className="p-1 text-center absolute top-0  w-[93%] flex justify-center items-center"
      >
        <FaChevronDown className="text-gray-500" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this ride to start</h3>
      <div className="flex items-center justify-between mt-4 p-4 border border-yellow-400 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt=""
          />
          <h2 className="text-xl font-medium">
            {props.rideData?.user.fullname.firstname}{" "}
            {props.rideData?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold ">2.2 KM</h5>
      </div>
      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaUserCircle size={"20px"} />
            <div>
              <h3 className="text-lg font-medium">128/33</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.rideData?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaLocationDot size={"20px"} />
            <div>
              <h3 className="text-lg font-medium">128/33</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.rideData?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <GiTakeMyMoney size={"20px"} />
            <div>
              <h3 className="text-lg font-medium">₹ {props.rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <button
            onClick={endRide}
            // to="/captain-home"
            className="w-full text-center flex justify-center mt-5 text-white bg-green-600 font-semibold rounded-lg p-2"
          >
            Finish Ride
          </button>
          <p className="text-xs mt-10 text-gray-500 ">
            Click on finish ride if you are completed the payment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinishRide;
