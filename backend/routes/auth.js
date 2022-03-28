const express = require("express");
const router = express.Router();

//MIDDLEWARE IMPORTS
const { authCheck, adminCheck } = require("../middleware/auth");
//CONTROLLER IMPORTS
const { createUser, activeUser } = require("../controllers/authController");

//ALWAYS HAVE THE MIDDLEWARE ARGUMENT BEFORE THE CONTROLLER
router.post("/create-user", authCheck, createUser);
router.post("/active-user", authCheck, activeUser);
router.post("/active-admin", authCheck, adminCheck, activeUser);

module.exports = router;
