const path = require('path');

// Set port to cPanel assigned port or default to 3000
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = 'production';

// Location of the standalone server
// We point this to our .next/standalone/server.js
const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

console.log('Starting TeknoVarta Standalone Server...');
console.log('Server Location:', standaloneServer);

// Require and start the server
require(standaloneServer);
