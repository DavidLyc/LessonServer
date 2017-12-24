const express = require('express');
const app = express();
const url = require("url");
const user_db = require('../db/user_db');

app.post('/*', (req, res) => {
    const pathname = url.parse(req.url).pathname;
    switch (pathname) {
        case '/login':
            login(req, res);
            break;
        case '/register':
            registerUser(req, res);
            break;
    }
});

function login(req, res) {
    const postJson = JSON.parse(JSON.stringify(req.body));
    user_db.validateLogin(postJson.name, postJson.password)
        .then(result => {
            if (JSON.stringify(result) !== '[]') {
                res.end('pass');
            } else {
                res.end('deny');
            }
        });
}

function registerUser(req, res) {
    const postJson = JSON.parse(JSON.stringify(req.body));
    user_db.register(postJson.name, postJson.password, postJson.class)
        .then(result => {
            res.end(result);
        });
}

module.exports = app;