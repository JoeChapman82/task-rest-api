const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidV4 = require('uuid/v4')

const TaskSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: () => uuidV4()
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
    },
    due: {
        type: Date,
        required: true,
        index: true,
    },
    user: {
        type: String,
        ref: 'user',
        default: null,
        index: true
    }
});

const Task = mongoose.model('task', TaskSchema);
module.exports = Task;
