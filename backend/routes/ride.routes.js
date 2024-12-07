const express = require('express');
const router = express.Router();
const {body , query} = require('express-validator')
const {createRide , getFare} = require('../controllers/ride.controller.js')
const authMiddleware = require('../middleware/auth.middleware.js');
router.post('/create', 
    authMiddleware.authUser,
    // body('userId').isString().isLength({min:3 , max:24}).withMessage('Invalid username'),
    body('pickup').isString().isLength({min:3}).withMessage('pickup must be at least 3 characters long'),
    body('destination').isString().isLength({min:3}).withMessage('destination must be at least 10 characters long'),
    body('vehicleType').isString().isIn(['car','auto' , 'moto']).withMessage('vehicle type must be at least 3 characters long'),
    createRide
)
router.get('/get-fare', 
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage(' pickup must be 3 chareacters'),
    query('destination').isString().isLength({min:3}).withMessage('destination must be at least 3 characters'),
    getFare 
)


module.exports = router;