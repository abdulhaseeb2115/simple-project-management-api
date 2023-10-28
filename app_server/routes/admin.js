var express = require("express");
var router = express.Router();
var adminController = require("../controllers/AdminController");

router.post("/sendMessage/:senderId/", adminController.sendMessage);
router.get("/viewMessages/", adminController.viewMessages);

router.post("/createProject/", adminController.createProject);

router.post("/createTeam", adminController.createTeam);

module.exports = router;
