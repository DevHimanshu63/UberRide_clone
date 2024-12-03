const captainModel = require('../models/captain.model.js');


module.exports.createCaptain = async ({
    firstname , lastname ,email,password,color ,plate, capacity ,vehicleType 
})=>{
   
    
    if (firstname) console.log('firstname is missing',firstname);
    if (lastname) console.log('lastname is missing',lastname);
    if (email) console.log('email is missing',email);
    if (password) console.log('password is missing',password);
    if (color) console.log('color is missing',color);
    if (plate) console.log('plate is missing',plate);
    if (capacity) console.log('capacity is missing',capacity);
    if (vehicleType) console.log('vehicleType is missing',  vehicleType);

    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All fields are required");
    }

    const captain = new captainModel({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    await captain.save(); 
    console.log("captain created", captain);
    return captain;
}