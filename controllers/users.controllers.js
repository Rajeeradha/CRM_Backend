const Users = require("../models/users.models");

exports.getAllUsers = (req, res) => {
    try{
        Users.find((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving users.'})
            }
            res.status(200).send(data);
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
};


exports.getUserByID = (req, res) => {
    try{
        Users.findOne({_id: req.params.id},(err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving user.'})
            }
            res.status(200).send(data);
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.updateUser = (req, res) => {
    try{
        Users.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, data) => {
            if(err){
                return res.status(400).send({message: "Error while updating an user."})
            }

            res.status(200).send({userID: req.params.id, message: 'User has been updated successfully.'})
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const existingUser = await Users.findOne({_id: req.params.id});

        if(existingUser){
            Users.deleteOne({_id: existingUser._id}, (err, data) => {
                if(err){
                    return res.status(400).send({message: "Error while deleting an user."});
                }
                res.status(200).send({message: "user data has been deleted successfully."})
            })
        }
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.getSignedInUserID = (req, res, next, userID) => {
    try{
        Users.findOne({_id: userID}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'User doesnt exist. Register as a new user.'})
            }
            req.profile = data;
            console.log("Req.Profile: ", req.profile);
            next();
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}