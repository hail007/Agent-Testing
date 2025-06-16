document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');
  const list = document.getElementById('todo-list');

  function createTodoItem(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    span.className = 'todo-text';

    const btnGroup = document.createElement('div');
    btnGroup.className = 'button-group';

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.className = 'done-button';
    doneBtn.addEventListener('click', () => {
      span.classList.toggle('done');
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-button';
    delBtn.addEventListener('click', () => {
      list.removeChild(li);
    });

    btnGroup.appendChild(doneBtn);
    btnGroup.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(btnGroup);
    return li;
  }

  addButton.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== '') {
      list.appendChild(createTodoItem(text));
      input.value = '';
      input.focus();
    }
  });

  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      addButton.click();
    }
  });
});