const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db =  process.env.MONGODB_URI;

module.exports = () => {

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection
.once('open', () => console.log('Connection establised with database'))
.on('error', () => console.warn('error connecting to db'));

};
