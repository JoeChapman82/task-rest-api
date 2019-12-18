const User = require('./user');

module.exports = {
    byId: (id) => User.findByIdAndRemove(id),
    all: () => User.deleteMany({})
};
