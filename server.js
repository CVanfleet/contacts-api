// express web server 

var express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hudson Vanfleet');
});

const port = 3000;

app.listen(process.env.port || port);
console.log('Web Server is listening at port http://localhost:' + (process.env.port || port));