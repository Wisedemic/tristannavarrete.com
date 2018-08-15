const argv = require('./argv');
// Get a Port or set a port... or whatever. Just gimme a port.
module.exports = parseInt(argv.port || process.env.PORT || '3000', 10);
