const form = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("desc");
const taskList = document.getElementById("task-list");

// Fetch and render tasks
async function fetchTasks() {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.title} - ${task.description}</span>
      <div>
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="toggleComplete(${task.id}, ${task.completed})">✔️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add task
form.addEventListener("submit", async e => {
  e.preventDefault();
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: titleInput.value, description: descInput.value })
  });
  form.reset();
  fetchTasks();
});

// Delete task
async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
}

// Toggle complete
async function toggleComplete(id, completed) {
  await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed })
  });
  fetchTasks();
}

// Edit task
async function editTask(id) {
  const newTitle = prompt("Edit title:");
  const newDesc = prompt("Edit description:");
  if (newTitle !== null) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDesc })
    });
    fetchTasks();
  }
}

// Initial render
fetchTasks();
