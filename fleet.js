var ArDroneFleet = require('ar-drone-fleet');
//var ardrone = require('ar-drone');
/*
var drone1 = ardrone.createClient({ip:'192.168.1.100'});
var drone2 = ardrone.createClient({ip:'192.168.1.101'});
*/

var fleet = new ArDroneFleet({
	drone1 : {ip : '192.168.2.100'},
	drone2 : {ip : '192.168.2.101'}
});
console.log(fleet.services.drone1._options);
fleet.services.drone1._options = {ip:'192.168.2.100'};
console.log(fleet.services.drone1._options);

fleet.takeoff();
//fleet.up('drone1', 2);
fleet.land();
