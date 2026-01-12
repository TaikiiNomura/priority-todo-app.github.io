let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const text = document.getElementById("taskInput").value;
  const priority = document.getElementById("priorityInput").value;

  if (text === "") return;

  todos.push({
    text: text,
    priority: priority,
    done: false
  });

  saveTodos();
  renderTodos();
}

function toggleDone(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  // 優先度順に並び替え
  const order = { high: 1, medium: 2, low: 3 };
  todos.sort((a, b) => order[a.priority] - order[b.priority]);

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.priority;
    li.innerHTML = `
      <input type="checkbox" ${todo.done ? "checked" : ""} onclick="toggleDone(${index})">
      ${todo.text} (${todo.priority})
    `;
    list.appendChild(li);
  });
}

renderTodos();
