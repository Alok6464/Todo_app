const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
// array which stores every todos
let todos = [];
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoInput.value); // call addTodo function with input box current value
});

function addTodo(item) {
  // if item is not empty
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };
    todos.push(todo);
    addToLocalStorage(todos); // then store it in localStorage
    todoInput.value = '';
  }
}

function renderTodos(todos) {
  todoItemsList.innerHTML = '';
  todos.forEach(function(item) {
    const checked = item.completed ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    todoItemsList.append(li);
  });
}

// function to add todos to local storage
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
        todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
}
getFromLocalStorage();
todoItemsList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});