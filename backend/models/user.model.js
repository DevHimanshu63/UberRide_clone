const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First Name must be at least 3 characters'],
            maxlength:50
        },
        lastname:{
            type:String,
            minlength:[3,'Last Name must be at least 3 characters'],
            maxlength:50
        },
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    }
});

userSchema.methods.generateToken = function(){
    const token =  jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
    return token;
}

//this is instance method
userSchema.methods.comparePassword =async function(password){
    return await bcrypt.compare(password , this.password)
}

//this is static method
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('User' ,userSchema)
module.exports = userModel;