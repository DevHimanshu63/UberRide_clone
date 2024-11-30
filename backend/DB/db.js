const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log("error in db",err));
}
module.exports = connectToDB;
