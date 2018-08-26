/**
	Main WebSocket Connect Function
	All New Connections pass through here.
	Returns a configured socket client.
	@Accepts: io Object
	@returns: Object
*/
module.exports = function(io) {
	// On New Connection, bind events, and init.
	io.on('connection', (client) => {
		// Bind events to this client, and pass IO for function calls.
		const events = require('./events')(io, client);

		// Attach Events here
		client.on('disonnect', events.disconnect);

		/*
			Update all sockets about the new connection.
		*/
		events.connect(client);
	});
};
