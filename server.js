// express web server 
const MongoClient = require('mongodb').MongoClient;
const BodyParser = require("body-parser");
const mongodb = require('./db/connect');


var express = require('express');
const app = express();
// Body Parser
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));

// Routes
app.use('/', require('./routes'));

const port = 3000;

mongodb.connect((err, mongodb) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});