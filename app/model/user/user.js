const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidV4 = require('uuid/v4');

const UserSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        index: true
        },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
