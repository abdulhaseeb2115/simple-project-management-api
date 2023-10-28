var messageModel = require("../models/messageModel");
var taskModel = require("../models/taskModel");
var projectModel = require("../models/projectModel");
var teamModel = require("../models/teamModel");

module.exports.sendMessage = function (req, res) {
	console.log("Sending Message");
	var message = {
		senderId: req.params.senderId,
		content: req.body.content,
	};
	insertData = new messageModel.messageModel(message);
	insertData.save(function (err, data) {
		if (err) throw err;
		res.send("Message Sent Successfully");
	});
};

module.exports.viewMessages = function (req, res) {
	console.log("Getting Messages");
	messageModel.messageModel.find({}).exec((err, result) => {
		if (err) console.log(err.message);

		res.send(result);
	});
};

module.exports.viewProgress = async (req, res) => {
	const project = await projectModel.projectModel.findById(req.params.id);
	console.log(project);
	if (!project) {
		res.status(404).json({
			message: "Project not found !",
		});
		return;
	}

	const tasks = await taskModel.taskModel.find(
		{ project: req.params.id },
		{ _id: 0, status: 1 }
	);
	res.status(200).json({
		tasks,
	});
};

module.exports.createTask = function (req, res) {
	console.log("Creating task");
	var task = {
		// project: req.body.project,
		// member: req.body.member,
		status: req.body.status,
	};
	insertData = new taskModel.taskModel(task);
	insertData.save(function (err, data) {
		if (err) throw err;
		res.send("Task created Successfully");
	});
};

module.exports.removeTask = function (req, res) {
	console.log("Removing task");

	taskModel.taskModel.findById(req.params.taskId).exec(function (err, data) {
		if (data) {
			// data found
			taskModel.taskModel.deleteOne({ id: req.params.taskId }, (err) => {
				if (err) console.log("Task not found");
				res.send("Task deleted successfully");
			});
		} else {
			res.send("Task not found");
		}
	});
};

module.exports.assignTask = function (req, res) {
	taskModel.taskModel.findByIdAndUpdate(
		req.params.taskId,
		{ member: req.params.memberId, project: req.params.projectId },
		function (err, task) {
			console.log(task);
		}
	);
	res.send("Task assigned successfully");
};

module.exports.approveTask = function (req, res) {
	taskModel.taskModel.findByIdAndUpdate(
		req.params.id,
		{ status: "DONE" },
		function (err, task) {
			if (err) throw err;
		}
	);
	res.send("Status changed successfully");
};

module.exports.rejectTask = function (req, res) {
	taskModel.taskModel.findByIdAndUpdate(
		req.params.id,
		{ status: "Rejected and In Progress" },
		function (err, task) {
			if (err) throw err;
			res.send("Task rejected successfully");
		}
	);
};

module.exports.addMember = async (req, res) => {
	const doc = await teamModel.teamModel.findOne({ _id: req.params.teamId });

	if (doc) {
		doc.members.push(req.params.memberId);
		await doc.save();
		res.send("Member added !");
	} else {
		res.send("Team not found !");
	}
};

module.exports.removeMember = async (req, res) => {
	const team = await teamModel.teamModel.findOne({ _id: req.params.teamId });

	if (team) {
		const members = team.members.filter(
			(member) => member._id.toString() !== req.params.memberId.toString()
		);
		console.log(members);

		teamModel.teamModel.findByIdAndUpdate(
			req.params.teamId,
			{ members: members },
			function (err, task) {
				if (err) res.send("Team not updated !");
				res.status(200).json({
					message: "Member removed !",
				});
			}
		);
	} else {
		res.send("Team not found !");
	}
};

module.exports.viewTeam = async (req, res) => {
	const team = await teamModel.teamModel.findById(req.params.teamId);

	res.status(200).json({
		team,
	});
};

module.exports.viewProgressDetailed = function (req, res) {
	taskModel.taskModel
		.find({ project: req.params.id })
		.exec(function (err, task) {
			if (err) throw err;

			var Done = 0;
			var ToDo = 0;
			var InProgress = 0;
			for (var i = 0; i < task.length; i++) {
				if (task[i].status.toLocaleLowerCase() == "done") {
					Done++;
				}
				if (task[i].status.toLocaleLowerCase() == "inprogress") {
					InProgress++;
				}
				if (task[i].status.toLocaleLowerCase() == "todo") {
					ToDo++;
				}
			}

			// res.send("Total Project Tasks :"+task.length+"\nTotal Task Done : "+((Done*100)/task.length).toFixed(2)+"%"+"\nTotal Task In Progress : "+((InProgress*100)/task.length).toFixed(2)+"%"+"\nTotal Task In ToDo : "+((ToDo*100)/task.length).toFixed(2)+"%");
			res.status(200).json({
				Done,
				ToDo,
				InProgress,
			});
		});
};
