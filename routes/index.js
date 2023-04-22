const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.routeHudson);
routes.get('/amanda', lesson1Controller.routeAmanda);

module.exports = routes;