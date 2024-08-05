document.addEventListener('DOMContentLoaded', () => {
    const codeDisplay = document.getElementById('code');
    const copyCodeBtn = document.getElementById('copy-code');
    const shareCodeBtn = document.getElementById('share-code');
    const codeInput = document.getElementById('code-input');
    const connectBtn = document.getElementById('connect-btn');
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    
    let localCode = generateCode();
    let remoteCode = null;
    let connected = false;
    
    codeDisplay.textContent = localCode;
    
    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(localCode);
        alert('Code copied to clipboard!');
    });
    
    shareCodeBtn.addEventListener('click', () => {
        alert('Share this code: ' + localCode);
    });
    
    connectBtn.addEventListener('click', () => {
        remoteCode = codeInput.value;
        if (remoteCode.length === 5) {
            setTimeout(() => {
                if (remoteCode === localCode) {
                    connected = true;
                    chatBox.value += 'Connected to: ' + remoteCode + '\n';
                } else {
                    chatBox.value += 'Failed to connect with code: ' + remoteCode + '\n';
                }
            }, 10000); // Simulates the 10-second wait
        } else {
            alert('Invalid code!');
        }
    });
    
    sendBtn.addEventListener('click', () => {
        if (messageInput.value && connected) {
            chatBox.value += 'You: ' + messageInput.value + '\n';
            messageInput.value = '';
        } else if (!connected) {
            alert('You need to connect to a chat first!');
        }
    });
    
    function generateCode() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
});