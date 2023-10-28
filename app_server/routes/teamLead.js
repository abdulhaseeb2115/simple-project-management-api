var express = require("express");
var router = express.Router();

var teamLeadController = require("../controllers/TeamLeadController");
router.post("/sendMessage/:senderId/", teamLeadController.sendMessage);
router.get("/viewMessages/", teamLeadController.viewMessages);

router.get("/viewProgressRaw/:id", teamLeadController.viewProgress);
router.get(
	"/viewProgressDetailed/:id",
	teamLeadController.viewProgressDetailed
);
router.post("/createTask/", teamLeadController.createTask);
router.delete("/removeTask/:taskId", teamLeadController.removeTask);

router.put(
	"/assignTask/:memberId/:taskId/:projectId",
	teamLeadController.assignTask
);
router.put("/approveTask/:id", teamLeadController.approveTask);
router.put("/rejectTask/:id", teamLeadController.rejectTask);

router.put("/addMember/:memberId/:teamId", teamLeadController.addMember);
router.delete(
	"/removeMember/:memberId/:teamId",
	teamLeadController.removeMember
);
router.get("/viewTeam/:teamId", teamLeadController.viewTeam);

module.exports = router;
