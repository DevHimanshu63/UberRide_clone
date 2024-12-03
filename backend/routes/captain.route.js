const express = require('express');
const router = express.Router();
const {body}  = require('express-validator')
const captainController = require('../controllers/captain.controller.js');

router.post('/register',[
    body('email').isEmail().withMessage('Please enter valid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('Please enter valid full name'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['Car', 'Motorcycle' , 'Auto']).withMessage('vehicle type is required'),
    captainController.registerCaptain
]);

module.exports = router