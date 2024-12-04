import React, { createContext, useState } from 'react'


export const CaptainDataContext = createContext()

function CaptainContext({children}) {
    const [captain , setCaptain] = useState(null);
    const [isLoading , setIsLoading] = useState(null);
    const [error ,setError] = useState(null);

    const updateCaptain=(catainData)=>{
        setCaptain(catainData)
    }
    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
    }

  return (
    <CaptainDataContext.Provider value={value}>
        {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext