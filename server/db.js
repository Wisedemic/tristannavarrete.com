// Import the DB constructor
const PouchDB = require('pouchdb');
PouchDB.adapter('socket', require('socket-pouch/client'));
// if (process.env.NODE_ENV === 'development') PouchDB.debug.enable('*');

// Create a local instance of PouchDB
var localDB = new PouchDB('localVRWorld');

// Fetch the remoteDB instance that was setup by initally
let remoteDB = new PouchDB({
	adapter: 'socket',
	name: 'remote',
	url: `ws://localhost:${process.env.PORT}/VRWorld`
});

// Keep them in sync across application deployments.
localDB.sync(remoteDB, {
  live: true,
  retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
});

// Export DB instance.
module.exports = localDB;
