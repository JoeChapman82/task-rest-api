const User = require('./user');

module.exports = {
    all: () => User.find({}, 'email name'),
    byId: (id) => User.findById(id, 'email name'),
    toAuthenticate: (email, password) => User.findOne({ email, password })
};
