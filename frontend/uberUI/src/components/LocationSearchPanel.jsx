import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
function LocationSearchPanel({suggestions, setPickup ,setDestination , activeField , setVehiclePanel , setPanelOpen}) {

    
    //sample array of location
    // const locations = [
    //     {
    //         id:1,
    //         name:'1522, Jyotikunj Dwarka CRPF Camp Complex 110078',
    //         lat:28.648711,
    //         lng:77.094217
    //     },
    //     {
    //         id:2,
    //         name:'1523, Jyotikunj Dwarka CRPF Camp Complex 110078',
    //         lat:28.648711,
    //         lng:77.094217
    //     },
    //     {
    //         id:3,
    //         name:'1524, Jyotikunj Dwarka CRPF Camp Complex 110078',
    //         lat:28.648711,
    //         lng:77.094217
    //     }
    // ]

    const handleSuggestions = (suggestions) => {
        if(activeField === 'pickup'){
            setPickup(suggestions)
        }
        else if(activeField === 'destination'){
            setDestination(suggestions)
        }
        //  setVehiclePanel(true)
        // setPanelOpen(false)
    }

  return (
    <div>
        {suggestions.map(function(elem , index){
            return(
                <div key={index} 
                onClick={()=>{
                    // setVehiclePanel(true)
                    // setPanelOpen(false)
                    handleSuggestions(elem.description)
                }} 
                className='flex border-2  border-gray-100 active:border-black rounded-xl p-3 my-2 items-center justify-start gap-4'>
                <h2 className='bg-[#eee] rounded-full h-10 w-10 flex items-center justify-center'><FaLocationDot /></h2>
                <h4 className='text-lg font-medium'>{elem.description} </h4>
                </div>
            )
        })}
    </div>
  )
}

export default LocationSearchPanel