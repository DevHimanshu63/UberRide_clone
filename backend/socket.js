const socketIo = require('socket.io');
const userModel = require('./models/user.model.js')
const captainModel = require('./models/captain.model.js')
let io;

function initializeSocket(server) {
    io = socketIo(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    

    io.on('connection', (socket) => {
        console.log(`New client connected:${socket.id}`);

        socket.on('join', async (data) =>{
            const {userType , userId} = data;
            console.log("data received from client: " + userType + " " + userId);
            
            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId , { socketId :socket.id })
            }
            else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId , { socketId :socket.id })
            }
        })  

        socket.on('update-location-captain', async (data) =>{
            const { userId ,userType ,location} = data;
            console.log("Location received from client: " + userId + " " + location.ltd + " " + location.lng);
            if(!location || !location.ltd || !location.lng){
                return socket.emit('error',{message:'invalid location'})
            }
            
           await captainModel.findByIdAndUpdate(userId , {
            location:{
                ltd:location.ltd,
                lng:location.lng
            } })
        })

       

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}

function sendMessageToSocketId(socketId , messageObject) {
    if(io){
        io.to(socketId).emit(messageObject.event,messageObject.data);
    }else{
        console.log('No active socket connection');
    }
}

module.exports = {initializeSocket , sendMessageToSocketId};