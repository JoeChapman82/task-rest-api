require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const errorHandler = require(path.join(__dirname, '/app/middleware/errorHandler'));
const bootstrap = require(path.join(__dirname, '/app/middleware/bootstrap'));
const routes = require(path.join(__dirname, '/app/routes/routes'));
const dbConnect = require(path.join(__dirname, '/app/model/init'));

dbConnect();

bootstrap(app);

app.set('json spaces', 4);

routes(app);

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port: ${port} in ${process.env.NODE_ENV} mode`));
