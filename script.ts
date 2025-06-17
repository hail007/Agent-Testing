document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input') as HTMLInputElement;
  const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
  const taskList = document.getElementById('task-list') as HTMLUListElement;

  fetch('/api/tasks')
    .then((res) => res.json())
    .then((tasks: { id: string; text: string; completed: boolean }[]) => {
      tasks.forEach(renderTask);
    });

  addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
      fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
        .then((res) => res.json())
        .then((task: { id: string; text: string; completed: boolean }) => {
          renderTask(task);
          taskInput.value = '';
          taskInput.focus();
        });
    }
  });

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });

  function renderTask(task: { id: string; text: string; completed: boolean }) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) {
      li.classList.add('completed');
    }
    li.dataset.id = task.id;

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    span.addEventListener('click', () => {
      fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      })
        .then((res) => res.json())
        .then((updatedTask: { completed: boolean }) => {
          task.completed = updatedTask.completed;
          li.classList.toggle('completed');
        });
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => {
      fetch(`/api/tasks/${task.id}`, { method: 'DELETE' }).then(() => {
        taskList.removeChild(li);
      });
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
});