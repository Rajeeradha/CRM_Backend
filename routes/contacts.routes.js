const express = require("express");
const router = express.Router();

// Importing controller
const { getAllContacts, getContactById, addContacts, updateContacts, deleteContacts } = require("../controllers/contacts.controllers");
const { getSignedInUserID } = require("../controllers/users.controllers");
const { requireSignIn, isAuth } = require("../utils/authentication");


router.get("/:userID/contacts", requireSignIn, isAuth, getAllContacts);

router.get("/:userID/contacts/:id", requireSignIn, isAuth, getContactById);

router.post("/contacts", addContacts);

router.put("/:userID/contacts/:id", requireSignIn, isAuth, updateContacts);

router.delete("/:userID/contacts/:id", requireSignIn, isAuth, deleteContacts);

router.param("userID", getSignedInUserID);

module.exports = router;