const blacklistTokenModel = require('../models/blacklist.token.model.js');
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


module.exports.loginCaptain =async function(req, res, next) {
    console.log("loginCaptain req",req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if(!captain){
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({ message: "Invalid email and password" });
    }
    const token = captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({ captain, token });
}

module.exports.getCaptainProfile = async function(req, res, next) {
    const captain = req.captain;
    res.status(200).json({ captain });
}
module.exports.logoutCaptain = async function(req, res, next) {
    console.log("logoutCaptain");
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   await blacklistTokenModel.create({token})
   res.clearCookie('token');
   res.status(200).json({message: "logout successfully"});
}
