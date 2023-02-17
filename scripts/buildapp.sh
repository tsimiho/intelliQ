#!/bin/sh

gnome-terminal -- sh -c "(gnome-terminal -- sh -c 'cd ../api-backend && npm install && npm start') && 
(gnome-terminal -- sh -c 'cd ../cli && npm install && sudo rm -rf /usr/local/lib/node_modules/cli && sudo npm install -g .') && 
(gnome-terminal -- sh -c 'cd ../frontend && npm install && npm start')"