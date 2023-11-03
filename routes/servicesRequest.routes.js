const express = require("express");
const router = express.Router();

// Importing controller
const { getAllServiceRequest, getServiceRequestById, addServiceRequest, updateServiceRequest, deleteServiceRequest } = require("../controllers/serviceRequest.controllers");
const { getSignedInUserID } = require("../controllers/users.controllers");
const { requireSignIn, isAuth } = require("../utils/authentication");


router.get("/:userID/serviceRequest", requireSignIn, isAuth, getAllServiceRequest);

router.get("/:userID/serviceRequest/:id", requireSignIn, isAuth, getServiceRequestById);

router.post("/serviceRequest", addServiceRequest);

router.put("/:userID/serviceRequest/:id", requireSignIn, isAuth, updateServiceRequest);
  
router.delete("/:userID/serviceRequest/:id", requireSignIn, isAuth, deleteServiceRequest);

router.param("userID", getSignedInUserID);

module.exports = router;