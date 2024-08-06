const socket = io('https://your-server-address.com'); // Replace with your server URL

document.getElementById('joinButton').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value;
    if (name) {
        socket.emit('join', name);
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('chatRoom').style.display = 'block';
    }
});

document.getElementById('sendButton').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    if (message) {
        socket.emit('chat message', message);
        document.getElementById('messageInput').value = '';
    }
});

document.getElementById('leaveButton').addEventListener('click', () => {
    socket.emit('disconnect');
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('chatRoom').style.display = 'none';
});

socket.on('chat message', (msg) => {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});