var messageModel = require("../models/messageModel");
var projectModel = require("../models/projectModel");
var teamModel = require("../models/teamModel");
// const { teamModel } = require('../models/TeamModel');
var mongoose = require("mongoose");

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

module.exports.createProject = (req, res) => {
	console.log("Creating project");
	var project = {
		name: req.body.name,
		description: req.body.description,
		start_Date: req.body.start_Date,
		end_Date: req.body.end_Date,
	};
	insertData = new projectModel.projectModel(project);
	insertData.save(function (err, data) {
		if (err) throw err;
		res.send("Project Saved Successfully");
	});
};

module.exports.createTeam = (req, res) => {
	console.log("Creating team");
	console.log("PROJECT: " + req.body.project === "63692aa5d81eb92f4135c298");
	const { project, lead, members, tasks } = req.body;
	var team = {
		project: project,
		lead: lead,
		members: members,
		tasks: tasks,
	};
	insertData = new teamModel.teamModel(team);
	insertData.save(function (err, data) {
		if (err) res.send(err.message);
		res.send("Team created Successfully");
	});
};
