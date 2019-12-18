const Task = require('./task');

module.exports = (newTask) => {
    const task = new Task({
        name: newTask.name,
        due: newTask.due,
        description: newTask.description,
        user: newTask.user
    });
    return task.save();
};
