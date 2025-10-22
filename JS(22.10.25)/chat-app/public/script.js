const socket = io();

const usernameInput = document.getElementById("username");
const joinBtn = document.getElementById("join-btn");
const usernameSection = document.getElementById("username-section");
const chatSection = document.getElementById("chat-section");

const form = document.getElementById("chat-form");
const input = document.getElementById("msg");
const messages = document.getElementById("messages");

let username = "";

// Join chat
joinBtn.addEventListener("click", () => {
  username = usernameInput.value.trim();
  if (username) {
    socket.emit("setUsername", username);
    usernameSection.style.display = "none";
    chatSection.style.display = "block";
  }
});

// Send message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (msg) {
    socket.emit("chatMessage", msg);
    input.value = "";
  }
});

// Receive message
socket.on("chatMessage", (data) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <div class="meta"><strong>${data.username}</strong> • ${data.time}</div>
    <div>${data.text}</div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

// Notify when user joins
socket.on("userJoined", (name) => {
  const div = document.createElement("div");
  div.classList.add("system");
  div.textContent = `${name} joined the chat`;
  messages.appendChild(div);
});

// Notify when user leaves
socket.on("userLeft", (name) => {
  const div = document.createElement("div");
  div.classList.add("system");
  div.textContent = `${name} left the chat`;
  messages.appendChild(div);
});
