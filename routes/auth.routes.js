const express = require("express");
const router = express.Router();

//Importing controller
const {register, signin, signout, forgotPassword, resetPassword} = require("../controllers/auth.controllers");

router.post('/register', register );

router.post('/signin', signin);

router.get('/signout', signout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:userID/:token', resetPassword);

module.exports = router;