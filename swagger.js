const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE-341 Personal API',
    description: 'This API is being used for my personal project in CSE-341',
  },
  host: 'cse341-hrf0.onrender.com',
  schemes: ['https', 'http'],
};

const outputFile = './path/swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);