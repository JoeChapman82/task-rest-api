module.exports = (err, req, res, next) => {
    if(process.env.NODE_ENV !== 'production') {
        return res.status(500).send(`Got an error:<br \>
            ${err}<br \>
            Stacktrace:<br \>
            ${err.stack}`);
    } else {
        return res.status(500).send('Internal server Error');
    }
};
