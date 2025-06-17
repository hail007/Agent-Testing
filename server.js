const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Log HTTP requests
app.use(morgan('dev'));
app.use(express.json());
// Serve front-end assets from public/
app.use(express.static(path.join(__dirname, 'public')));

// Data file for persistence
const DATA_FILE = path.join(__dirname, 'tasks.json');
let tasks = [];
try {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  tasks = JSON.parse(raw);
} catch (err) {
  if (err.code !== 'ENOENT') console.error('Error reading tasks.json:', err);
}

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid task text' });
  }
  const task = { id: uuidv4(), text, completed: false };
  tasks.push(task);
  saveTasks();
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid completed value' });
  }
  task.completed = completed;
  saveTasks();
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(index, 1);
  saveTasks();
  res.status(204).end();
});

// Persist tasks to disk after changes
function saveTasks() {
  fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), err => {
    if (err) console.error('Error writing tasks.json:', err);
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

