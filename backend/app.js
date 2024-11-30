const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectToDB = require('./DB/db.js');
const userRoutes = require('./routes/user.route.js')
connectToDB()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello, Express!');
})

app.use('/users',userRoutes)

module.exports = app;