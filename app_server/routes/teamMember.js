var express = require('express');
var router = express.Router();

var teamMemberController = require('../controllers/TeamMemberController');
router.post('/sendMessage/:senderId/', teamMemberController.sendMessage);
router.post('/viewMessages/', teamMemberController.viewMessages);

router.get('/viewTasks/:id', teamMemberController.viewTasks);

router.put('/changeTaskStatus/:id', teamMemberController.changeTaskStatus);
router.put('/submitTask/:id', teamMemberController.submitTask);

module.exports = router;