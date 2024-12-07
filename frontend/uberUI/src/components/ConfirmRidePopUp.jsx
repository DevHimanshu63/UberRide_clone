import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
function ConfirmRidePopUp(props) {
    const [otp , setOtp] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    
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
          <h2 className="text-xl font-medium">Himanshu Singh</h2>
        </div>
        <h5 className="text-lg font-semibold ">2.2 KM</h5>
      </div>
      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaUserCircle size={"20px"} />
            <div>
              <h3 className="text-lg font-medium">128/33</h3>
              <p className="text-sm -mt-1 text-gray-600">New Delhi , Haryana</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaLocationDot size={"20px"} />
            <div>
              <h3 className="text-lg font-medium">128/33</h3>
              <p className="text-sm -mt-1 text-gray-600">New Delhi , Haryana</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <GiTakeMyMoney size={"20px"} />
            <div>
              <h3 className="text-lg font-medium">₹ 200</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="bg-[#eee] px-6 py-4 text-lg font-mono rounded-lg w-full mt-3"
            />
            <Link
              to={"/captain-riding"}
              className="w-full text-center flex justify-center mt-5 text-white bg-green-600 font-semibold rounded-lg p-2"
            >
              Confirm{" "}
            </Link>
            <button
              onClick={() => {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}
              className="w-full mt-2 text-white bg-red-400 font-semibold rounded-lg p-2"
            >
              Cancel{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRidePopUp;
