#!/bin/sh

gnome-terminal -- sh -c 'cd ~/Desktop && mkdir Presentation && cd Presentation && git clone https://github.com/ntua/SoftEng22-44 && exit'
gnome-terminal -- sh -c 'cd ~/Desktop/Presentation/api-backend && npm install && npm start'
gnome-terminal -- sh -c 'cd ~/Desktop/Presentation/cli && npm install && npm install -g . && exit'
gnome-terminal -- sh -c 'cd ~/Desktop/Presentation/frontend && npm install && npm start'
