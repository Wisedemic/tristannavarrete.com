import io from 'socket.io-client';
const socket = io({
	autoConnect: false
});

window.addEventListener('beforeunload', socket.disconnect());

export function subscribeToConnect(cb) {
	socket.on('connect', client => cb(client));
	socket.open();
}

export function subscribeToUserList(cb) {
	socket.on('userList', (userList) => cb(userList));
}

export function subscribeToDisconnect(cb) {
	socket.on('disconnect', () => cb(socket.id));
}
