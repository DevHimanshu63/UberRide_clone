const userModel = require("../models/user.model.js");
const { validationResult } = require("express-validator");
const userService = require("../services/user.service.js");
const blacklistTokenSchema = require("../models/blacklist.token.model.js")
module.exports.registerUser = async (req, res, next) => {
  console.log("registerUser body", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exist with this email" });
  }
  const hashPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });
  const token = user.generateToken();
  res.status(201).json({ user, token });
};

module.exports.loginUser = async (req, res, next) => {
  console.log("data from login user received", req.body);
  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email and password" });
  }

  const token = user.generateToken();
  res.cookie('token', token)
  res.status(200).json({ user, token });

}

module.exports.getUserProfile = async (req, res) => {
  res.status(200).send(req.user);
}

module.exports.logoutUser = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await blacklistTokenSchema.create({token})
  res.clearCookie('token');
  res.status(200).json({ message: "User logged out" });
}

