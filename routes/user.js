const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/user");

router.post("/",userControllers.create);
router.post("/login",userControllers.login);
router.get("/",userControllers.read);

module.exports = router;