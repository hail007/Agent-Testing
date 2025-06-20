# Simple To-Do List Web App

A basic to-do list application built with HTML, CSS, and JavaScript.

## Usage

1. Install dependencies:
   ```sh
   npm install
   ```
2. Build the front-end:
   ```sh
   npm run build
   ```
3. Start the server:
   ```sh
   npm start
   ```
3. Open <http://localhost:3000> in your browser.

## Backend API

The backend provides a simple RESTful API for managing tasks:

- `GET /api/tasks` - Retrieve all tasks.
- `POST /api/tasks` - Create a new task. JSON body: `{ "text": "Task description" }`.
- `PATCH /api/tasks/:id` - Update a task's completion status. JSON body: `{ "completed": true }`.
- `DELETE /api/tasks/:id` - Delete a task.

