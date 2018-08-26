const users = require('./users');
const logger = require('../util/logger');

function rnd(max, min = 1) {
	return (Math.round(Math.random()) * 2 - 1) * Math.floor((Math.random() * max) + min) * -1;
}

function rdnNegative(max, min = 1) {
	return -Math.abs((Math.floor((Math.random() * max) + min)));
}

function rdnPositive(max, min = 1) {
	return Math.abs((Math.floor((Math.random() * max) + min)));
}

module.exports = function(io) {
	io.on('connection', function(client) {
		logger.event.connected(client.id);
		users.addUser({
			id: client.id,
			position: `${rnd(1, 2)} ${rnd(-3, 3)} ${rdnNegative(2, 6)}`
		});
		client.emit('userList', users.getAll());

		// User Typing Event.
		client.on('typingState', function(state) {
			if (state) {
				io.sockets.emit('typingState', true);
			} else {
				io.sockets.emit('typingState', false);
			}
		});

		// New Message Event
		client.on('newMessage', function(msg, username, roomID) {
			console.log('New Message from: ' + client.id + '\n"' + msg + '"');
			// Broadcast it to the client
			client.to(roomName).emit('broadcast', msg);
		});

		// User Disconnection Event
		client.on('disconnect', function() {
			// Debugging
			logger.event.disconnected(client.id);

			// Update User Count
			users.removeUser(client.id);

			// Broadcast disconnect to client.
			io.sockets.emit('disconnect', 'A user has disconnected');

			// Disconnect the client.
			client.disconnect();
		});
	});

};
