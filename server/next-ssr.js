const next = require('next');

const dev = process.env['NODE_ENV'] === 'development';
const nextApp = next({ dir: './client/', dev });

const requestHandler = nextApp.getRequestHandler();

const services = [
    '/users'
];

const isFeathersService = (path) => services.some((item) =>
    path.indexOf(item) > -1
);

module.exports = {
    nextApp,
    requestHandler,
    isFeathersService
}