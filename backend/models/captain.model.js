const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First Name must be at least 3 characters'],
            maxlength:50
        },
        lastname:{
            type:String,
            required:true,
            minlength:[3,'Last Name must be at least 3 characters'],
            maxlength:50
        },
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate: {
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address'
        }
    },
    password:{
        type:String,
        required:true,
        select:false, 
    },
    socketId:{
        type:String,
    },
    Status:{
        type:String,
        enum:['Active','InActive'],
        default:'InActive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be at least 3 characters'],
            maxlength:50
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be at least 3 characters'],
            maxlength:50
        },
        capacity:{
            type:Number,
            required:true,
            min:[1 , "Capacity must be at least 1"],
            max:200
        },
        vehicleType:{
            type:String,
            enum:['Car','Motorcycle','Auto'],
            required:true,
        }
    },
    location:{
        ltd:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token =  jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword =function(password){
    return bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword= function(password){
    return bcrypt.hash(password,10);
}

const captainModel = mongoose.model('Captain',captainSchema)
module.exports = captainModel;