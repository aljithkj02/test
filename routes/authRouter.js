const { Router } = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const router = Router();

function generateToken(obj){
    let token = jwt.sign(obj, process.env.JWT_CLIENT_SECRET);
    return token;
}

router.post('/register', async (req, res)=> {
    try {
        let user = req.body;
        let existingUser = await User.findOne({ email: user.email});
        if(existingUser){
            return res.send({
                success: false,
                message: 'User with this mail id already exist'
            })
        }
        user = await User.create({
            ...user,
            todos: []
        })
        
        let userObj = {
            _id: user._id,
            email: user.email
        }
        let token = generateToken(userObj);
        res.send({
            success: true,
            message: 'Registration Successful',
            token
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

router.post('/login', async (req, res)=> {
    try {
        let user = req.body;
        let existingUser = await User.findOne({ email: user.email});
        if(!existingUser){
            return res.send({
                success: false,
                message: 'User not Found'
            })
        }
        if(existingUser.password !== user.password){
            return res.send({
                success: false,
                message: 'Incorrect Password'  
            })
        }

        let userObj = {
            _id: existingUser._id,
            email: existingUser.email
        }
        let token = generateToken(userObj);
        res.send({
            success: true,
            message: 'Login Successful',
            token
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})


module.exports = router;