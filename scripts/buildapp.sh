#!/bin/sh

gnome-terminal -- sh -c "cd ~/Desktop && rm -rf SoftEng22-44 && git clone https://github.com/ntua/SoftEng22-44 && 
(gnome-terminal -- sh -c 'cd ~/Desktop/SoftEng22-44/api-backend && npm install && npm start') && 
(gnome-terminal -- sh -c 'cd ~/Desktop/SoftEng22-44/cli && npm install && sudo rm -rf /usr/local/lib/node_modules/cli && sudo npm install -g .') && 
(gnome-terminal -- sh -c 'cd ~/Desktop/SoftEng22-44/frontend && npm install && npm start')"