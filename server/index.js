/*
*  This is the app starting point.
*  This is also the webpack entry point.
*/

const express = require('express'); // Server
const logger = require('./util/logger'); // Logging
const argv = require('./util/argv'); // Environment Variables Helper
const port = require('./util/port'); // Application PORT. Returns a Number
// Middleware to serve the "Webpack React App Bundle"
const setup = require('./middlewares/frontendMiddleware');
const { resolve } = require('path');

const app = express();

/* SSL
  Accepts environment types: [Development, Production]
  And what statuscode return when redirecting to HTTPS: 302
*/
const ssl = function(environments, status) {
  environments = environments || ['production'];
  status = status || 302;
  return function(req, res, next) {
    if (environments.indexOf(process.env.NODE_ENV) >= 0) {
      if (req.headers['x-forwarded-proto'] != 'https') {
        res.redirect(status, 'https://' + req.hostname + req.originalUrl);
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  };
};

// Tell the app to use SSL in production, using a 302 for redirects
app.use(ssl(['production'], 302));

/*
	Add an API Server Here, or any other routes,
	before the app is compiled to serve react.

const api = require('./routes/'); // API Server
app.use('/api', api);

*/


// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start the app.
const server = require('http').Server(app);
const io = require('./socket/')(server);
server.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
