const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const helmet = require('helmet');
const express = require('express');

module.exports = (app) => {

    app.set('trust proxy', 1);
    app.use(helmet({}));

    if(process.env.NODE_ENV === 'production') {
        app.use(httpsRedirect);
    }

    app.use(favicon(path.join(__dirname, '../assets/images/', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, '../assets/')));

    app.use(helmet.noCache({'Cache-Control': 'max-age=86400'}));
    app.set('view engine', 'njk');


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded( {extended : false} ));


};
