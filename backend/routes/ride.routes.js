const express = require('express');
const router = express.Router();
const {body , query} = require('express-validator')
const {createRide , getFare , confirmRide , startRide , endRide} = require('../controllers/ride.controller.js')
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

router.post('/confirm' ,
        authMiddleware.authCaptain,
        body('rideId').isMongoId().withMessage('Invalid ride id'),
        confirmRide
)

router.get('/start-ride', authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({min:6 , max:6}).withMessage('otp  must be at least 6 characters long'),
    startRide
)


router.post('/end-ride', authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRide
)

module.exports = router;