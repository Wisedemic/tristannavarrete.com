const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');
const WS = chalk.yellow('[WebSocket] -');
/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

	// Events
	event: {
		log: (msg) => console.log(`${WS} - ${msg}`),
		connected: (id) => console.log(`${WS} Client id: {${id}} has Connected! ${chalk.green('✓')}`),
		disconnected: (id) => console.log(`${WS} Client id: {${id}} has Disconnected! ${chalk.green('❌')}`)
	},

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host) => {
    console.log(`Server started ! ${chalk.green('✓')}`);

    console.log(`
${chalk.bold('Access URLs:')}
${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}
${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  }
};

module.exports = logger;
