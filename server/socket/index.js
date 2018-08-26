const connect = require('./connect');

module.exports = (app) => {
	// Feed Express Server Into Socket.io
	let io = require('socket.io')(app);

	connect(io);

	// Return Configured Socket.io;
	return io;
};
