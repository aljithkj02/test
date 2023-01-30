const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authorize = async (req, res, next)=> {
    let authorization = req.headers.authorization;
    try {
        let token = authorization && authorization.split(' ').pop();
        if(!token) {
            return res.send({
                success: false,
                message: 'Login first'
            })
        }
        jwt.verify(token, process.env.JWT_CLIENT_SECRET,async (err, user)=> {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Invalid Token',
                    error: err.message
                })
            }
            let exist = await User.findOne({ _id: user._id });
            if(!exist) {
                return res.send({
                    success: false,
                    message: 'Invalid Token'
                })
            }
            req.user = exist;
            next();
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message   
        })  
    } 
}

module.exports = authorize; 