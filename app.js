const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const user = require('./route/user');
const article = require('./route/article');
const helmet = require('helmet');
const xss = require('./middelware/xss');

const app = express();

app.use(express.json());
app.use(helmet({
    contentSecurityPolicy: false,
    contentTypeOptions: {
        nosniff: true
    }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/', xss, user);
app.use('/article', xss, article)

module.exports = app;