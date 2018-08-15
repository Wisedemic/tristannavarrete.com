const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// Wrapper to add some default options to webpack
function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    silent: true,
    stats: 'errors-only'
  });
}

// Add Development Middleware
module.exports = function addDevMiddlewares(app, webpackConfig) {
	// Grab Webpack compiler
  const compiler = webpack(webpackConfig);

	// Attach Middleware to the compiler
  const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);
  app.use(middleware);

	app.use(webpackHotMiddleware(compiler)); // Hot-Reloading

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

	// Resolve all GET requests to serve the app,
	// if they have not been resolved yet by the API routes.
  app.get('/*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
