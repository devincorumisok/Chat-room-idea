// Initialize PeerJS
const peer = new Peer();
let conn;
const connectionTimeout = 10000; // 10 seconds
let connectionStartTime;

// Generate a random 5-digit code
function generateCode() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

// Copy the code to the clipboard
function copyCode() {
    const codeElement = document.getElementById('user-code');
    navigator.clipboard.writeText(codeElement.textContent).then(() => {
        alert('Code copied to clipboard!');
    });
}

// Update the displayed code
function updateCode() {
    const code = generateCode();
    document.getElementById('user-code').textContent = code;
}

// When the peer is open, set the code and listen for connections
peer.on('open', id => {
    console.log('My peer ID is: ' + id);
    updateCode();
});

// When a connection is received
peer.on('connection', connection => {
    const now = Date.now();
    if (conn && (now - connectionStartTime < connectionTimeout)) {
        conn = connection;
        conn.on('data', data => {
            const messagesElement = document.getElementById('messages');
            const messageElement = document.createElement('div');
            messageElement.textContent = 'Peer: ' + data;
            messagesElement.appendChild(messageElement);
            messagesElement.scrollTop = messagesElement.scrollHeight;
        });
        console.log('Connected with peer.');
    } else {
        connection.close();
        console.log('Connection timed out or invalid.');
    }
});

// Send a message to the connected peer
function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;

    if (conn && message) {
        conn.send(message);
        const messagesElement = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.textContent = 'You: ' + message;
        messagesElement.appendChild(messageElement);
        messagesElement.scrollTop = messagesElement.scrollHeight;
        messageInput.value = '';
    }
}

// Connect to another peer
function connectPeer() {
    const peerId = document.getElementById('peer-id').value;
    if (peerId) {
        connectionStartTime = Date.now();
        conn = peer.connect(peerId);
        conn.on('open', () => {
            console.log('Connected to peer: ' + peerId);
        });
        conn.on('data', data => {
            const messagesElement = document.getElementById('messages');
            const messageElement = document.createElement('div');
            messageElement.textContent = 'Peer: ' + data;
            messagesElement.appendChild(messageElement);
            messagesElement.scrollTop = messagesElement.scrollHeight;
        });

        // Close connection if not paired within timeout
        setTimeout(() => {
            if (conn && conn.open) {
                conn.close();
                console.log('Connection timed out.');
            }
        }, connectionTimeout);
    }
}