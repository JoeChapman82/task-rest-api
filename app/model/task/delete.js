const Task = require('./task');

module.exports = {
    byId: (id) => Task.findByIdAndRemove(id),
    byHistoricDate: (date) => Task.remove({due: {"$lte": date}}),
    all: () => Task.deleteMany({})
};
