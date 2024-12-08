const express = require('express');
const rideService = require('../services/ride.service.js')
const {validationResult} = require('express-validator');


module.exports.createRide = async (req , res , next) => {
    console.log('createRide body request',req.body);
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {pickup , destination , vehicleType} = req.body;
    try{
        
        const ride = await rideService.createRide({ user:req.user._id , pickup , destination , vehicleType});
        res.status(201).json(ride);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal Server Error'});
    }
}
