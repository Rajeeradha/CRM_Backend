exports.isAdmin = (req, res, next) => {
    try {
        console.log("Req.Profile: ", req.profile)
        if(req.profile.role !== 1) {
            return res.status(401).send({message: "Admin resource!, Access Denied"})
        }
        next();
    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }
}