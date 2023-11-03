const express = require("express");
const router = express.Router();

// Importing controller
const { getAllLeads, getLeadById, addLeads, updateLeads, deleteLeads } = require("../controllers/leads.controllers");
const { getSignedInUserID } = require("../controllers/users.controllers");
const { requireSignIn, isAuth } = require("../utils/authentication");


router.get("/:userID/leads", requireSignIn, isAuth, getAllLeads);
  
router.get("/:userID/leads/:id", requireSignIn, isAuth, getLeadById);

router.post("/leads", addLeads);
  
router.put("/:userID/leads/:id", requireSignIn, isAuth, updateLeads);
  
router.delete("/:userID/leads/:id", requireSignIn, isAuth, deleteLeads);

router.param("userID", getSignedInUserID);


module.exports = router;