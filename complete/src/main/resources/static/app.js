const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);

    // Subscribe to a topic
    stompClient.subscribe('/topic/greetings', (greeting) => {
        showGreeting(JSON.parse(greeting.body).content);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

// Update the UI based on connection state
function setConnected(connected) {
    document.getElementById("connect").disabled = connected;
    document.getElementById("disconnect").disabled = !connected;

    const conversation = document.getElementById("conversation");
    if (connected) {
        conversation.style.display = "block";
    } else {
        conversation.style.display = "none";
    }

    const greetings = document.getElementById("greetings");
    greetings.innerHTML = ""; // Clear greetings
}

// Activate the WebSocket connection
function connect() {
    stompClient.activate();
}

// Deactivate the WebSocket connection
function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

// Publish a message to the server
function sendName() {
    const name = document.getElementById("name").value;
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({ name: name })
    });
}

// Display a greeting message on the screen
function showGreeting(message) {
    const greetings = document.getElementById("greetings");
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = message;
    row.appendChild(cell);
    greetings.appendChild(row);
}

// Attach event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => e.preventDefault()); // Prevent form submission

    document.getElementById("connect").addEventListener("click", connect);
    document.getElementById("disconnect").addEventListener("click", disconnect);
    document.getElementById("send").addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default button behavior
        sendName();
    });
});
