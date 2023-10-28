var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/27017');
var schema = mongoose.Schema;
var messageSchema = new schema({
    senderId: { 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'employeeModel'
    },
    content: {
        type: String,
        required: true
    },
});
module.exports.messageModel = mongoose.model('messageModel', messageSchema, 'Messages')