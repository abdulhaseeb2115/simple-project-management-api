var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/27017');
var schema = mongoose.Schema;
var projectSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    start_Date: {
        type: Date,
        // required: true
    },
    end_Date: {
        type: Date,
        // required: true
    },
});
module.exports.projectModel = mongoose.model('projectModel', projectSchema, 'Projects')