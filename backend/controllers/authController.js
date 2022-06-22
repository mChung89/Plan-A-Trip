const User = require("../model/User");
const {
  registerValidation,
  loginValidation,
} = require("../validations/userValidation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')



//Create a New User
const newUser = async (req, res) => {
  //Validation
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send({errors: error.details[0].message});
  }
  // Check if user is in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send({errors: "Email already exists"});
  }
  // Hash the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create the User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  //Create User in DB
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser });
    
    // res.json({ user, accessToken })
  } catch (err) {
    res.status(400).send(err);
  }
};

//Login
const loginUser = async (req, res) => {
  //Validation
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send({errors: error.details[0].message});
  }
  // Check if user is in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({errors:"Invalid email"});
  }
  // If password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) {
      return res.status(400).send({errors: "Invalid password"})
  }

  //Create and assign a token
  const accessToken = jwt.sign(
    {time: Date(), 
      _id: user._id,
      username: user.name}, process.env.TOKEN_SECRET,
      { expiresIn: '30m'}
      )
      
      const refreshToken = jwt.sign(
        {time: Date(), 
          _id: user._id}, process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d'}
          )
      const updateUserRefreshToken = await User.findOneAndUpdate({_id: user._id}, {$set: {refreshToken: refreshToken}})
          res.cookie('auth-jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
          res.json({ user, accessToken })
};

const getMe = async (req,res) => {
  console.log("me")
  
}

module.exports = {
  newUser,
  loginUser,
  getMe
};
