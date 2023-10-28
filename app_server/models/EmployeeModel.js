var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/27017");
// var schema = mongoose.Schema;

var employeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

module.exports.employeeModel = mongoose.model(
	"employeeModel",
	employeeSchema,
	"Employees"
);
