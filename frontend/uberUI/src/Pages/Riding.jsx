import React, { useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { Link , useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketProvider";
function Riding() {
  const location = useLocation();
  const {ride} = location.state || {};
  console.log(ride);
  const {socket} = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on('ride-ended',()=>{
    navigate('/home');
  })

  
  return (
    <div className="h-screen">
        <Link to={'/home'} className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <IoMdHome size={'24px'}/>
        </Link>
      <div className="h-1/2">
        <img
          className="object-cover w-full h-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABLUH3RR9WY4ogN9jIsbV0QTaQWXDvEWW1A&s"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">{ride?.captain.fullname.firstname} {ride?.captain.fullname.lastname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 flex-col justify-between items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <FaLocationDot size={"20px"} />
              <div>
                <h3 className="text-lg font-medium">128/33</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 ">
              <GiTakeMyMoney size={"20px"} />
              <div>
                <h3 className="text-lg font-medium">{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  Cash Payment
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 text-white bg-green-600 font-semibold rounded-lg p-2">Make a Payment</button>
      </div>
    </div>
  );
}

export default Riding;
