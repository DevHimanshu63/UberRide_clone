import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function ConfirmRidePopUp(props) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHander = async (e) => {
    e.preventDefault();
    console.log("submitHander called");
    

    const response = await axios.get(`http://localhost:4000/rides/start-ride`, {
      params: {
        rideId: props.ride._id,
        otp: otp,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("response from the start-ride api",response);
    
    
    if (response.status === 200) {
      props.setConfirmRidePopUpPanel(false);
      props.setRidePopUpPanel(false);
      navigate("/captain-riding");
    }
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
        className="p-1 text-center absolute top-0  w-[93%] flex justify-center items-center"
      >
        <FaChevronDown className="text-gray-500" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to start
      </h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-300 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt=""
          />
          <h2 className="text-xl font-medium capitalize">
            {props.ride?.user.fullname.firstname}{" "}
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
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaLocationDot size={"20px"} />
            <div>
              <h3 className="text-lg font-medium">128/33</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <GiTakeMyMoney size={"20px"} />
            <div>
              <h3 className="text-lg font-medium">₹ {props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={submitHander}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />

            <button className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRidePopUp;
