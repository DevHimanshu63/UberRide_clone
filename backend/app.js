const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDB = require('./DB/db.js');
const userRoutes = require('./routes/user.route.js')
const captainRoutes = require('./routes/captain.route.js')
connectToDB()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello, Express!');
})

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)


module.exports = app;