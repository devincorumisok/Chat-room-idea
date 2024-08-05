// script.js

// Replace with your own PeerJS key
const peer = new Peer(undefined, {
    host: 'peerjs-server.herokuapp.com', // Use PeerJS's hosted server
    port: 443,
    secure: true
});

let peerId = '';
let conn = null;

// Generate a random 5-digit code and display it
function generateCode() {
    return Math.floor(10000 + Math.random() * 90000);
}

// Set up the peer ID and display it
function setupPeer() {
    peerId = generateCode().toString();
    document.getElementById('user-code').innerText = `Your Code: ${peerId}`;

    // Handle incoming connections
    peer.on('connection', (connection) => {
        conn = connection;
        connection.on('data', (data) => {
            displayMessage(data);
        });
    });

    // Handle disconnection
    peer.on('disconnected', () => {
        conn = null;
    });
}

// Copy the peer code to clipboard
function copyCode() {
    const code = document.getElementById('user-code').innerText.replace('Your Code: ', '');
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    });
}

// Connect to another peer using the provided code
function connectPeer() {
    const peerIdToConnect = document.getElementById('peer-id').value;
    if (peerIdToConnect === peerId) {
        alert('You cannot connect to yourself!');
        return;
    }

    conn = peer.connect(peerIdToConnect);

    // Set a timeout for connection attempt
    setTimeout(() => {
        if (conn && conn.open) {
            conn.on('open', () => {
                conn.on('data', (data) => {
                    displayMessage(data);
                });
            });
        } else {
            alert('Failed to connect. The other peer may not have entered the correct code or timed out.');
            conn = null;
        }
    }, 10000); // 10 seconds timeout
}

// Display a message in the chat area
function displayMessage(message) {
    const messageArea = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageArea.appendChild(messageElement);
}

// Send a message to the connected peer
function sendMessage() {
    const message = document.getElementById('message').value;
    if (conn && conn.open) {
        conn.send(message);
        displayMessage(`You: ${message}`);
        document.getElementById('message').value = '';
    } else {
        alert('You are not connected to anyone.');
    }
}

// Initialize the peer and setup the connection
setupPeer();