import io from 'socket.io-client';

const socket = io({
	autoConnect: false,
	forceNew: true
});

export function subscribeToConnect(cb) {
	socket.on('connect', (client) => cb(client));
	socket.open();
}

export function subscribeToUserList(cb) {
	socket.on('userList', (userList) => cb(userList));
}

export function subscribeToUserConnected(cb) {
	socket.on('userConnected', (user) => cb(user));
}

export function subscribeToUserDisconnected(cb) {
	socket.on('userDisconnected', (id) => cb(id));
}

export function disconnect() {
	socket.emit('disonnect', socket.id);
	socket.close();
}

window.addEventListener("beforeunload", function () {
  disconnect()
});
