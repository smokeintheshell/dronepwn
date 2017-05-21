var arDrone = require('ar-drone');
var client = arDrone.createClient({ip:'192.168.2.100'});
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
	1-0:		Set Speed from 0-1 ie 0.1, 0.2, ... 0.9 NOTE: 0 = set speed to 1 STUPID FUCKING FAST!!!
	h:		Print This Menu
	CTRL+C:		Exit
	*/});

console.log(menu);

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function(key){
    if (key == '\u001B\u005B\u0041') {
//        console.log('up'); 
	client.front(speed);
    }
    if (key == '\u001B\u005B\u0043') {
//        console.log('right'); 
	client.right(speed);
    }
    if (key == '\u001B\u005B\u0042') {
//        console.log('down'); 
	client.back(speed);
    }
    if (key == '\u001B\u005B\u0044') {
//        process.stdout.write('left'); 
//	console.log('left');
	client.left(speed);
    }
    if (key == 'e') {
//    	console.log('e');
	client.clockwise(speed);
    }
    if (key == 'w') {
//	console.log('w');
	client.up(speed);
//	console.log(speed);
    }
    if (key == 's') {
//	console.log('s');
	client.down(speed);
//	console.log(speed);
    }
    if (key == 'q') {
//	console.log('q');
	client.counterClockwise(speed);
    }
    if (key == 'a') {
	client.animate('flipLeft', 1000);
    }
    if (key == 'd') {
	client.animate('flipRight', 1000);
    }
    if (key == '\r') {
//        console.log('enter');
	client.takeoff();
    }
    if (key == 'r') {
	client.disableEmergency();
    }
    if (key == '\u007F') {
//	console.log('backspace');
	client.stop();
	client.land();
    }
    if (key == ' ') {
//        console.log('space');
	client.stop();
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
