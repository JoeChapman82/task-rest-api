const requireDir = require('require-dir');
const task = requireDir('../model/task');
const user = requireDir('../model/user');
const apiDescription = require('../config/apiDescription');
const responses = require('../controllers/responses');


module.exports = (app) => {

    app.get('/', (req, res) => res.send(apiDescription));

    app.get('/task', async (req, res, next) => {
        try {
            res.send(await task.read.all());
        } catch(error) {
            responses.serverError(req, res);
        }
    });

    app.delete('/task', async (req, res, next) => {
        try {
            res.send(await task.delete.all());
        } catch(error) {
            responses.serverError(req, res);
        }
    });

    app.get('/task/:id', async (req, res, next) => {
        if(!req.params.id) {
            res.locals.errors = {
                'params.id': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        try {
            res.send(await task.read.byId(req.params.id));
        } catch(error) {
            responses.serverError(req, res);
        }
    });

    app.delete('/task/:id', async (req, res, next) => {
        if(!req.params.id) {
            res.locals.errors = {
                'params.id': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        try {
            res.send(await task.delete.byId(req.params.id));
        } catch(error) {
            responses.serverError(req, res);
        }
    });

    app.patch('/task/:id', async (req, res, next) => {
        if(!req.params.id) {
            res.locals.errors = {
                'params.id': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        let update = {}
        if(req.body.name) {
            update.name = req.body.name;
        }
        if(req.body.description) {
            update.description = req.body.description;
        }
        if(req.body.due) {
            update.due = new Date(req.body.due);
        }
        if(req.body.user) {
            update.user = req.body.user
        }
        try {
            await task.update.byId(req.params.id, update);
            res.send(await task.read.byId(req.params.id));
        } catch(error) {
            responses.serverError(req, res);
        }
    });

    app.post('/task', async (req, res, next) => {
        if(!req.body.name) {
            res.locals.errors = {
                'body.name': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        if(!req.body.description) {
            res.locals.errors = {
                'body.description': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        if(!req.body.due) {
            res.locals.errors = {
                'body.due': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        try {
            res.send(await task.create({
                name: req.body.name,
                description: req.body.description,
                due: new Date(req.body.due)
            }));
        } catch(error) {
            responses.serverError(req, res);
        }
    });

    app.delete('/user', async (req, res, next) => {
        try {
            res.send(await user.delete.all());
        } catch(error) {
            responses.serverError(req, res);
        }
    });

    app.get('/user/:id', async (req, res, next) => {
        if(!req.params.id) {
            res.locals.errors = {
                'params.id': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        try {
            res.send(await user.read.byId(req.params.id));
        } catch(error) {
            responses.serverError(req, res);
        }
    });

    app.delete('/user/:id', async (req, res, next) => {
        if(!req.params.id) {
            res.locals.errors = {
                'params.id': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        try {
            res.send(await user.delete.byId(req.params.id));
        } catch(error) {
            responses.serverError(req, res);
        }
    });

    app.patch('/user/:id', async (req, res, next) => {
        if(!req.params.id) {
            res.locals.errors = {
                'params.id': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        let update = {}
        if(req.headers.email) {
            update.email = req.headers.email;
        }
        if(req.headers.password) {
            update.password = req.headers.password;
        }
        if(req.body.name) {
            update.name = req.body.name;
        }
        try {
            await user.update.byId(req.params.id, update);
            res.send(await user.read.byId(req.params.id));
        } catch(error) {
            responses.serverError(req, res);
        }
    });

    app.post('/user', async (req, res, next) => {
        if(!req.body.name) {
            res.locals.errors = {
                'body.name': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        if(!req.headers.password) {
            res.locals.errors = {
                'headers.password': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        if(!req.headers.email) {
            res.locals.errors = {
                'headers.email': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        try {
            res.send(await user.create({
                name: req.body.name,
                email: req.headers.email,
                password: req.headers.password
            }));
        } catch(error) {
            console.log(error);
            responses.serverError(req, res);
        }
    });


    app.post('/login', async (req, res, next) => {
        if(!req.headers.email) {
            res.locals.errors = {
                'headers.email': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        if(!req.headers.password) {
            res.locals.errors = {
                'headers.password': 'Is required'
            }
            return responses.badRequest(req, res);
        }
        try {
            res.send(await user.read.toAuthenticate(req.headers.email, req.headers.password));
        } catch(error) {
            responses.serverError(req, res);
        }
    });







    app.all('*', (req, res) => {
        responses.methodNotAllowed(req, res);
    });
    return app;
}
