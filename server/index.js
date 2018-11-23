/* eslint-disable no-console */
const logger = require('./logger');
const { mainApp, api } = require('./app');
const port = mainApp.get('port');

const nextApp = require('./next-ssr').nextApp;

nextApp.prepare().then(() => {

  // Start the server
  const server = mainApp.listen(port);

  // Setup the api afterwards (this is how feathersjs says to do it)
  api.setup(server);


  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', mainApp.get('host'), port)
  );
});
