const { expressjwt } = require("express-jwt");

// Decrpytion the jwt
exports.requireSignIn = expressjwt({
    secret: process.env.URL,
    algorithms: ['HS256'],
    userProperty: 'auth'
});


// Authentication
exports.isAuth = (req, res, next) => {
    let user = req.auth._id === req.params.userID;
    
    if(!user) {
        return res.status(401).send({message: 'Access Denied! Sign in required'})
    }
    next()
}
 