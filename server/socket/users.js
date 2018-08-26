/*
	Online Count functions */
let userCount = 0;
function getUserCount() {
	return userCount;
}
function incrementOnline() {
	return ++userCount;
}
function decrementOnline() {
	return --userCount;
}

let users = [];
function addUser(data) {
	users = users.concat(data);
	incrementOnline();
}

function getById(id) {
	return users.filter(user => user.id !== id);
}

function getAll() {
	return users;
}

function removeUser(id) {
	users = users.filter(user => user.id !== id);
	decrementOnline();
	return users;
}

// Exports
module.exports = {
	userCount,
	getUserCount,
	incrementOnline,
	decrementOnline,
	users,
	addUser,
	getAll,
	getById,
	removeUser
};
