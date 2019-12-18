module.exports = {
    badRequest: (req, res) => res.status(400).send(res.locals.errors || 'Bad Request'),
    serverError: (req, res) => res.status(500).send('Internal Server Error'),
    methodNotAllowed: (req, res) => res.status(405).send('Method Not Allowed')
};
