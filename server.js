// express web server 

var express = require('express');
const app = express();
const lesson1Controller = require('./controllers/lesson1');

app.get('/', lesson1Controller.routeHudson);
app.get('/amanda', lesson1Controller.routeAmanda);

const port = 3000;

app.listen(process.env.port || port);
console.log('Web Server is listening at port http://localhost:' + (process.env.port || port));