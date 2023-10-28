var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/27017');
var schema = mongoose.Schema;
var taskSchema = new schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projectModel",
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employeeModel",
    },
    status: {
        type: String,
        required: true,
    },
});
module.exports.taskModel = mongoose.model('taskModel', taskSchema, 'Tasks')