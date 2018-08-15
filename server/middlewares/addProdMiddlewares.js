const path = require('path');
const express = require('express');
const compression = require('compression');

module.exports = function addProdMiddlewares(app, options) {
	// Setup Webpack output path
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
	// Set public path for express to find the webpack file
	const publicPath = options.publicPath || '/';

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

	// Resolve all GET requests to serve the app,
	// if they have not been resolved yet by the API routes.
  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
};
