const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Users = require("../models/users.models");
var crypto = require('crypto');
const Token = require('../models/token.models');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
    try {
        const payload = req.body;
        if(!payload.password){
            return res.status(400).send({message: "Password is mandatory!"});
        }
        const hashValue = await bcrypt.hash(payload.password, 15);
        payload.hashedPassword = hashValue;
        delete payload.password;
        
        let newUser = new Users(payload);
        await newUser.save((err, data) => {
            if(err) {
                if(err.errors) {
                    return res.status(400).send({message: `${JSON.stringify(err.errors)}`})
                }
                if(err.code === 11000) {
                    if(err.keyValue.email) {
                        return res.status(400).send({message: 'User with this email already exists'})
                    }
                }
                return res.status(400).send({message: 'User registration failed'})
            }
            return res.status(201).send({userID: data._id, message: "User registration successfull"})
        })

    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }
};

exports.signin = async (req, res) => {
    try {
        const {email, password} = req.body; //email and password
        const existingUser = await Users.findOne({email: email}) // to check whether user exists or not
        
        if(existingUser) {
            const isMatching = await bcrypt.compare(password, existingUser.hashedPassword); //true or false
            if(isMatching) {
                const token = jwt.sign({_id: existingUser._id}, process.env.SECRET_KEY);

                res.cookie('entrytoken', token, {expire: new Date() + 86400000}); 

                const {_id, email} = existingUser;
                return res.status(200).send({token: token, userID: _id, email: email, message: "User signed in successfully"});
            }
            return res.status(400).send({message: "Incorrect email or password"});
        }
        return res.status(400).send({message: "User not found"})
    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }
};

exports.signout = async (req, res) => {
    try {
        await res.clearCookie("entrytoken");
        return res.status(200).send({message: "User signed out successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }
};

exports.forgotPassword = async (req, res) => {
    try{
        const user = await Users.findOne({email: req.body.email});
        console.log('User: ', user)
        if(user.email){
            let token = await Token.findOne({userId: user._id});
            if(!token){
                let newToken = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex')
                })
                const userToken = await newToken.save();

                const url = `${process.env.FRONTEND_BASE_URL}/reset-password/${user._id}/${userToken.token}`;
                const isSent = await sendEmail(user.email, 'RESET PASSWORD LINK', url);

                if(isSent){
                    return res.status(200).send('Reset password link has been sent to you!')
                }
                return res.status(400).send('Error while sending reset-password link')
            }
        }

        res.status(400).send({message: 'User does not exist with the given email.'})
    }catch(error){
        console.log('Error: ', error);
        res.status(500).send({message: 'Internal Server Error'})
    }
}

exports.resetPassword = async(req, res) => {
    try{
        const existingUser = await Users.findOne({_id: req.params.userID});
        if(existingUser){
            const token = await Token.findOne({userId: existingUser._id, token: req.params.token});
            if(token){
                if(req.body.password === req.body.confirmPassword){
                    const hashValue = await bcrpyt.hash(req.body.password, 15);
                    
                    Users.findByIdAndUpdate({_id: existingUser._id}, {$set: {...existingUser, hashedPassword: hashValue}}, (err, data) => {
                        if(err){
                            return res.status(400).send({message: "Error while reseting the password"})
                        }
            
                        return res.status(200).send({userID: existingUser._id, message: 'Password reset is successfull'})
                    })
                }
            }
            return res.status(400).send({message: "Invalid token"})
        }
        res.status(400).send({message: 'Users does not exist with the given email.'})

    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
}