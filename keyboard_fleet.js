var arDrone = require('ar-drone');
/*
var client1 = arDrone.createClient({ip:'192.168.2.100'});
var client2 = arDrone.createClient({ip:'192.168.2.101'});
var client3 = arDrone.createClient({ip:'192.168.2.102'});
var client4 = arDrone.createClient({ip:'192.168.2.103'});
var client5 = arDrone.createClient({ip:'192.168.2.104'});
var client6 = arDrone.createClient({ip:'192.168.2.105'});
var client7 = arDrone.createClient({ip:'192.168.2.106'});
var client8 = arDrone.createClient({ip:'192.168.2.107'});
var client9 = arDrone.createClient({ip:'192.168.2.108'});
var client10 = arDrone.createClient({ip:'192.168.2.109'});
*/
var client = arDrone.createClient({ip:'192.168.2.101'});
var arDroneFleet = require('ar-drone-fleet');

var fleet = new arDroneFleet({
	drone1 : {ip:'192.168.2.100'},
	drone2 : {ip:'192.168.2.101'},
	drone3 : {ip:'192.168.2.102'},
	drone4 : {ip:'192.168.2.103'},
	drone5 : {ip:'192.168.2.104'},
	drone6 : {ip:'192.168.2.105'},
	drone7 : {ip:'192.168.2.106'},
	drone8 : {ip:'192.168.2.107'},
	drone9 : {ip:'192.168.2.108'},
	drone10 : {ip:'192.168.2.109'}
});

fleet.services.drone1._options = {ip:'192.168.2.100'};
fleet.services.drone2._options = {ip:'192.168.2.101'};
fleet.services.drone3._options = {ip:'192.168.2.102'};
fleet.services.drone4._options = {ip:'192.168.2.103'};
fleet.services.drone5._options = {ip:'192.168.2.104'};
fleet.services.drone6._options = {ip:'192.168.2.105'};
fleet.services.drone7._options = {ip:'192.168.2.106'};
fleet.services.drone8._options = {ip:'192.168.2.107'};
fleet.services.drone9._options = {ip:'192.168.2.108'};
fleet.services.drone10._options = {ip:'192.168.2.109'};

//console.log(fleet.services.drone1._options);
var controlled = fleet;

var speed = 0.1

var multi = require('multiline');

// TODO: implement multiple drones through either ip address or configure for use with ar-drone-fleet

//feel free to change keys as you see fit for your set up, i found the below configuration to be best for me
const menu = multi(function(){/*
	Up Arrow:	Forward
	Down Arrow:	Backward
	Left Arrow:	Strafe Left
	Right Arrow:	Strafe Right
	Enter:		Takeoff
	Backspace:	Land
	Space:		Stop
	w:		Up
	s:		Down
	a:		Rotate Counter Clockwise
	d:		Rotate Clockwise
	q:		Flip Left
	e:		Flip Right
	r:		Disable Emergency
	1-0:		Set Speed from 0-1 ie 0.1, 0.2, ... 0.9 NOTE: 0 = set speed to 1 FAST!!!
	h:		Print This Menu
	CTRL+C:		Exit
	*/});

console.log(menu);

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function(key){
    if (key == 't') {
	controlled.stop();
	controlled = fleet;
    }
    if (key == 'y') {
	controlled.stop();
	controlled = fleet.services.drone1;
    }
    if (key == 'u') {
	controlled.stop();
	controlled = fleet.services.drone2;
    }
    if (key == 'i') {
	controlled.stop();
	controlled = fleet.services.drone3;
    }
    if (key == 'o') {
	controlled.stop();
	controlled = fleet.services.drone4;
    }
    if (key == 'p') {
	controlled.stop();
	controlled = fleet.services.drone6;
    }
    if (key == '\u001B\u005B\u0041') {
//        console.log('up'); 
	controlled.front(speed);
    }
    if (key == '\u001B\u005B\u0043') {
//        console.log('right'); 
	controlled.right(speed);
    }
    if (key == '\u001B\u005B\u0042') {
//        console.log('down'); 
	controlled.back(speed);
    }
    if (key == '\u001B\u005B\u0044') {
//        process.stdout.write('left'); 
//	console.log('left');
//	client.left(speed);
	controlled.left(speed);
    }
    if (key == 'e') {
//    	console.log('e');
//	client.clockwise(speed);
	controlled.clockwise(speed);
    }
    if (key == 'w') {
//	console.log('w');
//	client.up(speed);
	controlled.up(speed);
    }
    if (key == 's') {
//	console.log('s');
//	client.down(speed);
//	console.log(speed);
	controlled.down(speed);
    }
    if (key == 'q') {
//	console.log('q');
//	client.counterClockwise(speed);
	controlled.counterClockwise(speed);
    }
/*    if (key == 'a') {
//	client.animate('flipLeft', 1000);
	controlled.animate('flipLeft', 1000);
    }
    if (key == 'd') {
//	client.animate('flipRight', 1000);
	controlled.animate('flipRight', 1000);
    }
*/
    if (key == '\r') {
//      console.log('enter');
//	client.takeoff();
//	fleet.takeoff();
	controlled.takeoff();
    }
    if (key == 'r') {
//	client.disableEmergency();
	controlled.disableEmergency();
    }
    if (key == '\u007F') {
//	console.log('backspace');
//	client.stop();
//	client.land();
//	fleet.stop();
//	fleet.land();
	controlled.stop();
	controlled.land();
    }
    if (key == ' ') {
//        console.log('space');
//	client.stop();
	controlled.stop();
    }
    if (key == '1') {
	speed = 0.1;
	console.log(speed);
    }
    if (key == '2') {
	speed = 0.2;
	console.log(speed);
    }
    if (key == '3') {
	speed = 0.3;
	console.log(speed);
    }
    if (key == '4') {
	speed = 0.4;
	console.log(speed);
    }
    if (key == '5') {
	speed = 0.5;
	console.log(speed);
    }
    if (key == '6') {
	speed = 0.6;
	console.log(speed);
    }
    if (key == '7') {
	speed = 0.7;
	console.log(speed);
    }
    if (key == '8') {
	speed = 0.8;
	console.log(speed);
    }
    if (key == '9') {
	speed = 0.9;
	console.log(speed);
    }
    if (key == '0') {
	speed = 1;
	console.log(speed);
    }
    if (key == 'h') {
	console.log(menu);	
    }
    if (key == '\u0003') { process.exit(); }    // ctrl-c
});
