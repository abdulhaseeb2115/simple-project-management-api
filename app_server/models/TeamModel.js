var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/27017");

var schema = mongoose.Schema;
var teamSchema = new schema({
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "projectModel",
		required: true,
	},
	lead: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "employeeModel",
		required: true,
	},
	members: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "employeeModel",
			},
		},
	],
	tasks: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "taskModel",
			},
		},
	],
});
module.exports.teamModel = mongoose.model("teamModel", teamSchema, "Teams");
