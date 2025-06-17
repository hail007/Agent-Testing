document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addBtn = document.getElementById('add-btn');
  const taskList = document.getElementById('task-list');

  fetch('/api/tasks')
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load tasks: ${res.status}`);
      return res.json();
    })
    .then(tasks => tasks.forEach(renderTask))
    .catch(err => {
      console.error(err);
      alert('Error loading tasks: ' + err.message);
    });

  addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
      fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
        .then(res => {
          if (!res.ok) throw new Error(`Failed to add task: ${res.status}`);
          return res.json();
        })
        .then(task => {
          renderTask(task);
          taskInput.value = '';
          taskInput.focus();
        })
        .catch(err => {
          console.error(err);
          alert('Error adding task: ' + err.message);
        });
    }
  });

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });

  function renderTask(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) {
      li.classList.add('completed');
    }
    li.dataset.id = task.id;

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'task-text';
    toggleBtn.textContent = task.text;
    toggleBtn.disabled = false;
    toggleBtn.addEventListener('click', () => {
      toggleBtn.disabled = true;
      fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      })
        .then(res => {
          if (!res.ok) throw new Error(`Failed to update task: ${res.status}`);
          return res.json();
        })
        .then(updatedTask => {
          task.completed = updatedTask.completed;
          li.classList.toggle('completed', updatedTask.completed);
        })
        .catch(err => {
          console.error(err);
          alert('Error updating task: ' + err.message);
        })
        .finally(() => {
          toggleBtn.disabled = false;
        });
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.addEventListener('click', () => {
      deleteBtn.disabled = true;
      fetch(`/api/tasks/${task.id}`, { method: 'DELETE' })
        .then(res => {
          if (!res.ok && res.status !== 204) throw new Error(`Failed to delete task: ${res.status}`);
          taskList.removeChild(li);
        })
        .catch(err => {
          console.error(err);
          alert('Error deleting task: ' + err.message);
          deleteBtn.disabled = false;
        });
    });

    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
});
