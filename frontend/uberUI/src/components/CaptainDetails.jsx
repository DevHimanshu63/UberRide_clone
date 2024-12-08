import React, { useContext } from 'react'
import { IoMdTime } from "react-icons/io";
import { IoMdSpeedometer } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";
import {CaptainDataContext} from '../context/CaptainContext.jsx'
function CaptainDetails() {
  const {captain} = useContext(CaptainDataContext);
  return (
    <div>
         <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
            <h4 className="text-lg font-medium">{captain?.fullname?.firstname}</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">295.20</h4>
            <p className="text-sm  text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-3 bg-gray-100 mt-8 rounded-xl justify-center gap-5 items-start">
          <div className="text-center flex flex-col justify-center items-center mb-2">
            <IoMdTime size={'24px'} className="text-center" />
            <h5 className="text-lg font-medium">10.2</h5>
            <p  className="test-sm text-gray-600"> Hours Online</p>
          </div>
          <div className="text-center flex flex-col justify-center items-center mb-2">
            <IoMdSpeedometer size={'24px'}/>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="test-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center flex flex-col justify-center items-center mb-2">
            <MdOutlineEventNote size={'24px'}  className=""/>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="test-sm text-gray-600">Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails