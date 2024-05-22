document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const startButton = document.getElementById('startButton');
    const outputArea = document.getElementById('outputArea');

    startButton.addEventListener('click', () => {
        socket.emit('start-commands');
    });

    socket.on('output', (data) => {
        outputArea.textContent += data;
        outputArea.scrollTop = outputArea.scrollHeight;
    });
});