const express = require('express');
const app = express();
const url = require("url");
const lesson_db = require('../db/lesson_db');

app.get('/*', (req, res) => {
    const pathname = url.parse(req.url).pathname;
    const major = pathname.substr(1);
    lesson_db.getLessons(major)
        .then(result => {
            res.send(result);
            res.end();
        });
});

module.exports = app;