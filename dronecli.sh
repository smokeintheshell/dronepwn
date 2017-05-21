#!/bin/sh
# issue these commands from telnet, or pipe into telnet
killall udhcpd; iwconfig eth0 mode managed essid dronepwn; ifconfig ath0 192.168.2.101 netmask 255.255.255.0 up;

