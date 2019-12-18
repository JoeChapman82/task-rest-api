const Task = require('./task');

module.exports = {
    byId: (id, update) => Task.findByIdAndUpdate(id, update),
};
