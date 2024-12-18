const rideModel = require('../models/ride.model.js')
const mapService = require('../services/maps.service.js')
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket.js');


const getFare = async (pickup , destination)=>{
    if(!pickup || !destination){
        throw new Error("Pickup and destination must be provided");
    }
    
    const distanceTime = await mapService.getDistanceAndTime(pickup, destination);
    console.log('distanceTime: ', distanceTime);
    
    
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };
    
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };
    
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };
    
    
    
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.distance.value / 1000) * perKmRate.auto) + ((distanceTime.distance.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.distance.value / 1000) * perKmRate.car) + ((distanceTime.distance.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.distance.value / 1000) * perKmRate.moto) + ((distanceTime.distance.duration.value / 60) * perMinuteRate.moto))
    };
    
    return fare;
    
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({ user , pickup , destination , vehicleType})=>{
    console.log('createRide', user, pickup, destination, vehicleType);
    
    if(!user || !pickup || !destination ||  !vehicleType){
        throw new Error("All fields must be provided");
    }
    const fare = await getFare(pickup, destination);
    if (!fare[vehicleType]) {
        throw new Error(`Invalid fare value for vehicle type: ${vehicleType}`);
    }
    const ride = new rideModel({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare:fare[vehicleType]
        
    })
    await ride.save();
    return ride;
}

module.exports.confirmRide = async ({ rideId , captain})=>{
    
    if(!rideId){
        throw new Error("Ride id must be provided");
    }
    await rideModel.findOneAndUpdate({_id:rideId},
        {
            status:'accepted',
            captain: captain._id
        }
    )
    const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp');
    console.log('ride data from ride.service.js page', ride);
    
    if (!ride) {
        throw new Error("Ride not found");
    }
    return ride ;
};

module.exports.startRide = async ({ rideId , captain , otp })=>{
    console.log('startRide', rideId, captain, otp);
    if(!rideId || !otp){
        throw new Error("Ride id and otp must be provided");
    }
    const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp')
    if (!ride) {
        throw new Error("Ride not found");
    }
    if(ride.status !=='accepted'){
        throw new Error("Ride not accepted");
    }
    if(ride.otp!== otp){
        throw new Error("Invalid otp");
    }
    await rideModel.findOneAndUpdate({_id:rideId},
        {
            status:'ongoing'
        })
   return ride;
}

module.exports.endRide = async({rideId , captain})=>{
    console.log('endRide', rideId, captain);
    if(!rideId){
        throw new Error("Ride id must be provided");
    }
    const ride = await rideModel.findOne({
        _id:rideId ,
        captain:captain._id
     }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error("Ride not found");
    }
    if(ride.status !== 'ongoing'){
        throw new Error("Ride not ongoing");
    }
        await rideModel.findOneAndUpdate({_id:rideId},
        {
            status:'completed'
        })

    return ride;
}

