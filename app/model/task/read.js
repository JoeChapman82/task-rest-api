const Task = require('./task');

module.exports = {
    all: () => Task.find().populate({path: 'user', select: 'name'}),
    byId: (id) => Task.findById(id),
    byParams: (params) => Task.find(params).limit(50).populate({path: 'user', select: 'name'}),
    byDateRange: (id, start, end) => {
        return Task.find({due: {$gte: start, $lte: end}}).populate({path: 'user', select: 'name'});
    },
    byUser: (userId) => Task.find({user: userId}).limit(50).populate({path: 'user', select: 'name'}),
};
