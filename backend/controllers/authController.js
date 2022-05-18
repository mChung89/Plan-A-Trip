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
    return res.status(400).send(error.details[0].message);
  }
  // Check if user is in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
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
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

//Login
const loginUser = async (req, res) => {
  console.log('Trying to log in!')
  //Validation
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if user is in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email not found");
  }
  // If password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) {
      return res.status(400).send("Password not found")
  }


  //Create and assign a token
  const token = await jwt.sign({time: Date(), _id: user._id}, process.env.TOKEN_SECRET)
  // res.header('auth-token', token).send({accessToken: token})
  res.header('auth-token', token).send("Authorized!")

  // res.send({accessToken: token})
};

// Validating Token

// const validateToken = (req, res) => {
//     try {
//         const token = req.header(process.env.TOKEN_HEADER_KEY);
//         const verified = jwt.verify(token, TOKEN_SECRET)
//         if (verified) {
//             return res.send("Sucessfully verified")
//         } else {
//             // Access Denied
//             return res.status(401).send(error)
//         }
//       } catch (error) {
//           //Access Denied
//           return res.status(401).send(err0r)
//       }
// }
module.exports = {
  newUser,
  loginUser,
};
