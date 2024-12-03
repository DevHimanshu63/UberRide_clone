const captainModel = require('../models/captain.model.js')
const captainService = require('../services/captain.service.js')
const { validationResult , body } = require("express-validator");

module.exports.registerCaptain =async function(req, res, next) {
    console.log("registercaptain req",req.body);
    
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const {fullname , email , password , vehicle} = req.body;
    const iscaptainAlreadyExist = await captainModel.findOne({email});
    if(iscaptainAlreadyExist){
        return res.status(400).json({ message: "Captain already exist with this email" });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    })
    
    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });
}
