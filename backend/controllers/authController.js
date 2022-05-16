const User = require('../model/User')
const { registerValidation, loginValidation } = require('../validations/userValidation')
const bcrypt = require('bcryptjs')


//Validation
const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})

const newUser = async (req,res) => {

    //Validation
    const { error } = registerValidation(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }
    // Check if user is in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) {
        return res.status(400).send('Email already exists')
    }
    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create the User 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    //Create User in DB
    try {
        const savedUser = await user.save()
        res.send({user: savedUser._id});
    } catch(err) {
        res.status(400).send(err)
    }
}


module.exports = {
    newUser
}