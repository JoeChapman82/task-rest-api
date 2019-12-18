const User = require('./user');

module.exports = ({ email, password, name }) => {
    const user = new User({ email, password, name });
    return user.save();
};
