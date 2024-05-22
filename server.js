const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { exec } = require('child_process');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('start-commands', () => {
        const commands = `
termux-setup-storage &&
apt update && apt upgrade && pkg update && pkg upgrade && pkg install bash && pkg install libwebp && pkg install git -y && pkg install nodejs -y && pkg install ffmpeg -y && pkg install wget && pkg install imagemagick -y && pkg install yarn &&
git clone https://github.com/russellxz/CORTANABOT2.0.git &&
cd CORTANABOT2.0 &&
yarn install && npm install && npm update &&
npm start
`;

        const process = exec(commands);

        process.stdout.on('data', (data) => {
            socket.emit('output', data.toString());
        });

        process.stderr.on('data', (data) => {
            socket.emit('output', data.toString());
        });

        process.on('close', (code) => {
            socket.emit('output', `Process exited with code ${code}`);
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});