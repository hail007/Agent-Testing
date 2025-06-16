document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");

  addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text !== "") {
      const li = document.createElement("li");
      li.className = "task-item";

      const span = document.createElement("span");
      span.className = "task-text";
      span.textContent = text;
      span.addEventListener("click", () => {
        li.classList.toggle("completed");
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML = "&times;";
      deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);

      taskInput.value = "";
      taskInput.focus();
    }
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });
});