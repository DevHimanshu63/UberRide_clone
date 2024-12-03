const express = require('express');
const router = express.Router();
const {validationResult , body} = require('express-validator');
const userController = require('../controllers/user.controller.js');
const { authUser } = require('../middleware/auth.middleware.js');

router.get('/test',(req,res)=>{
    res.send('Test route')
})
router.post('/register',[
    body('email').isEmail().withMessage('Please enter valid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('Please enter valid full name'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    userController.registerUser
]);

// Login Route
router.post('/login', [
    body('email').isEmail().withMessage('Please enter valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    userController.loginUser
]);

//profileRoute
router.get('/profile', authUser , userController.getUserProfile);
router.get('/logout', userController.logoutUser);

module.exports = router;