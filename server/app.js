const path = require('path');
// Quick hack to move the config directory.
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, './config');

const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');

const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const mongoose = require('./mongoose');

const api = express(feathers());

// Load app configuration
api.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
api.use(helmet());
api.use(cors());
api.use(compress());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
api.configure(express.rest());

api.configure(socketio());

api.configure(mongoose);

api.configure(authentication);
// Set up our services (see `services/index.js`)
api.configure(services);
// Set up event channels (see channels.js)
api.configure(channels);
// Configure other middleware (see `middleware/index.js`)
api.configure(middleware);

// Configure a middleware for 404s and the error handler
api.use(express.notFound());
api.use(express.errorHandler({ logger }));

api.hooks(appHooks);

/* Setup the main feathers application */
const mainApp = express(feathers());

mainApp.use((req, _, next) => { console.log(req.url); next(); });

// Mount the api to a /api/{@version}/{@route} path
mainApp.use('/api/v1/', api);

// Add configuration settings
mainApp.configure(configuration());

// Logging

// Retrieve the next.js request handler
const requestHandler = require('./next-ssr').requestHandler;

// Any request after this point should serve the next.js app.
mainApp.get('*', (req, res) => requestHandler(req, res));

module.exports = { mainApp, api };
