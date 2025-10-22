const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

const dataFile = path.join(__dirname, "tasks.json");

// Helper functions
function readTasks() {
  const data = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
}

// CRUD APIs

// Get all tasks
app.get("/api/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// Create new task
app.post("/api/tasks", (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || "",
    completed: false
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.json(newTask);
});

// Update task
app.put("/api/tasks/:id", (req, res) => {
  let tasks = readTasks();
  const taskId = parseInt(req.params.id);
  tasks = tasks.map(task =>
    task.id === taskId
      ? { ...task, title: req.body.title ?? task.title, description: req.body.description ?? task.description, completed: req.body.completed ?? task.completed }
      : task
  );
  writeTasks(tasks);
  res.json(tasks.find(t => t.id === taskId));
});

// Delete task
app.delete("/api/tasks/:id", (req, res) => {
  let tasks = readTasks();
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  writeTasks(tasks);
  res.json({ message: "Task deleted" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


/* ✅ Explanation

Data is stored in tasks.json.

readTasks() reads the JSON file.

writeTasks(tasks) writes the updated tasks back.

Standard REST APIs: GET, POST, PUT, DELETE.

Tasks have id, title, description, completed. */