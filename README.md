# Simple To-Do List Web App

A basic to-do list application built with HTML, CSS, and JavaScript.

## Usage

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. Open <http://localhost:3000> in your browser.

Static files (HTML, CSS, JS) are served from the `public/` directory.

## Backend API

The backend provides a simple RESTful API for managing tasks:

- `GET /api/tasks` - Retrieve all tasks.
- `POST /api/tasks` - Create a new task. JSON body: `{ "text": "Task description" }`.
- `PATCH /api/tasks/:id` - Update a task's completion status. JSON body: `{ "completed": true }`.
- `DELETE /api/tasks/:id` - Delete a task.
- Data is persisted to `tasks.json` on disk so tasks survive server restarts.

## Frontend Usage

1. Enter a task in the input field and click "Add" or press Enter.
2. Click on a task to toggle its completion state.
3. Click the "×" button next to a task to delete it.

## Persistence

Tasks are saved in `tasks.json` in the project root, so they persist across server restarts.
