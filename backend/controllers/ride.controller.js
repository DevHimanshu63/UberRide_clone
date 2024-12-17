const express = require('express');
const rideService = require('../services/ride.service.js')
const {validationResult} = require('express-validator');
const mapService = require('../services/maps.service.js');
const { sendMessageToSocketId } = require('../socket.js');
const rideModel = require('../models/ride.model.js');

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
        const pickupCordinates = await mapService.getAddressCoordinate(pickup)
        console.log(pickupCordinates);
        
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCordinates.ltd , pickupCordinates.lng , 7000)
        console.log('captainsInRadius',captainsInRadius);

        ride.otp = ''
        const rideWithUser  = await rideModel.findOne({_id:ride._id}).populate('user')
        captainsInRadius.map(captain=>{
            console.log(captain , ride);
            
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:rideWithUser
            })
        })
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal Server Error'});
    }
}

module.exports.getFare = async (req , res , next) =>{
    console.log('/get-fare called');
    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const {pickup , destination} = req.query;
        try{
            const fare = await rideService.getFare(pickup , destination);
            return res.status(200).json(fare);
        }catch(err){
            console.error(err);
            res.status(500).json({message:'Internal Server Error'});
        }
}

module.exports.confirmRide = async (req , res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId} = req.body;
    try{
        const ride = await rideService.confirmRide({rideId , captain:req.captain});

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-confirmed',
            data:ride
        })
    }catch(err){
        console.log(err);
        
    }
}

module.exports.startRide = async (req , res , next) => {
    console.log("startRide data received from client side",req);
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId , otp} = req.query;
    try{
        const ride = await rideService.startRide({rideId , captain:req.captain , otp});

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-started',
            data:ride
        })
        return res.status(200).json(ride);
    }catch(err){
        console.log(err);
        
    }
}