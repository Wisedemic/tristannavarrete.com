const attachEvents = require('./events');

module.exports = (app) => {
	// Feed Express Server Into Socket.io
	let io = require('socket.io')(app);

	attachEvents(io);

	// Return Configured Socket.io;
	return io;
};
