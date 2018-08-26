const users = require('./users');
const logger = require('../util/logger');

module.exports = function(io, client) {
	function rnd(max, min = 1) {
		return (Math.round(Math.random()) * 2 - 1) * Math.floor((Math.random() * max) + min) * -1;
	}

	function rdnNegative(max, min = 1) {
		return -Math.abs((Math.floor((Math.random() * max) + min)));
	}

	function rdnPositive(max, min = 1) {
		return Math.abs((Math.floor((Math.random() * max) + min)));
	}

	/*
	 	Logs the client, Adds the user,
		Emits the list of users to the new connection */
	function connect() {
		// Log
		logger.event.connected(client.id);

		let user = {
			id: client.id,
			// Random player position in the world.
			position: `${rnd(0, 2)} ${rdnNegative(-3, 3)} ${rdnNegative(2, 6)}`
		};
		users.addUser(user);

		// update the user: give them a list of connected users.
		client.emit('userList', users.getAll());

		// Update everyone: a new user has joined.
		client.broadcast.emit('userConnected', user);
	}

	// Disconnect the client
	function disconnect() {
		// Debugging
		logger.event.disconnected(client.id);

		// Update User Count
		users.removeUser(client.id);

		// Broadcast disconnect to client.
		client.broadcast.emit('userDisconnected', client.id);

		// Disconnect the client.
		client.disconnect();
	}

	return {
		connect,
		disconnect
	};
}
