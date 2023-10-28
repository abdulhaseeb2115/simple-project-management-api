var messageModel = require('../models/messageModel');
var employeeModel = require('../models/employeeModel');
var taskModel = require('../models/taskModel');

module.exports.sendMessage = function (req, res) {
    console.log('Sending Message');
    var message = {
        senderId: req.params.senderId,
        content: req.body.content,
    };
    insertData = new messageModel.messageModel(message);
    insertData.save(function (err, data) {
        if (err) throw err;
        res.send('Message Sent Successfully');
    });
} 

module.exports.viewMessages = function (req, res) {
    console.log('Getting Messages');
    messageModel.messageModel.find({}).exec((err, result) => {
        if (err) console.log(err.message);
        
        res.send(result);
    });
}

module.exports.viewTasks = async (req, res) => {
    const member = await employeeModel.employeeModel.findById(req.params.id);
    if (!member) {
        res.status(404).json({
            message: "Member not found !"
        });
        return;
    }

    const tasks = await taskModel.taskModel.find({ member: req.params.id });
    res.status(200).json({
        tasks,
    });
};

module.exports.changeTaskStatus = function (req, res) {
    taskModel.taskModel.findByIdAndUpdate(req.params.id, { status: req.body.status }, function (err, task) {
        if (err) throw err;
        res.send("Task status changed successfully");
    })
}


module.exports.submitTask = function (req, res) {
    taskModel.taskModel.findByIdAndUpdate(req.params.id, { status: "Task Submitted / Waiting For Approval" }, function (err, task) {
        if (err) throw err;
        res.send("Task submitted successfully");
    })
}