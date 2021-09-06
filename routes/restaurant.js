const express = require('express');
const router = express.Router();
const restaurantControllers = require("../controllers/restaurant");

router.get("/",restaurantControllers.readAll);
router.get("/:id",restaurantControllers.read);
router.post("/",restaurantControllers.create);
router.delete("/:id",restaurantControllers.remove);
router.patch("/:id",restaurantControllers.update);

module.exports = router;