#!/bin/bash
service hostapd stop
service isc-dhcp-server stop
ifconfig wlan0 down
ifconfig eth0 up
killall hostapd
ifconfig wlan1 down
iwconfig wlan1 mode managed
ifconfig wlan1 up
