const express = require("express");
const router = express.Router();

// Importing controller
const { getAllUsers, getUserByID, updateUser, deleteUser, getSignedInUserID } = require("../controllers/users.controllers");
const { requireSignIn, isAuth } = require("../utils/authentication");
const { isAdmin } = require("../utils/authorization");


router.get('/:userID/users', requireSignIn, isAuth, getAllUsers);

router.get('/:userID/users/:id', requireSignIn, isAuth, getUserByID);

router.put('/:userID/users/:id', requireSignIn, isAuth, isAdmin, updateUser);

router.delete('/:userID/users/:id', requireSignIn, isAuth, isAdmin, deleteUser);

router.param('userID', getSignedInUserID);


module.exports = router;
