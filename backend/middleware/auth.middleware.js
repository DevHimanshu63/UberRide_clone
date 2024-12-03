const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistModel = require('../models/blacklist.token.model.js');
const captainModel = require('../models/captain.model.js');
module.exports.authUser = async (req, res , next) => {
    console.log('authUser - Cookies:', req.cookies.token); 
    console.log('authUser - Authorization Header:', req.headers.authorization);
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await blacklistModel.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({ message: "Unauthorized" });
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res , next ) => {
    const token = req.cookies.token ||req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await blacklistModel.findOne({token:token})
    if(isBlacklisted){
        return res.status(401).json({ message: "Unauthorized" });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    }catch(err){
        console.log(err);
        res.status(401).json({message:'unauthorized'})
    }   
}