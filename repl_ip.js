var arDrone = require('ar-drone');
var client = arDrone.createClient({ip:'192.168.2.100'}); // set up a repl for a drone with different ip than defualt
client.createRepl();
