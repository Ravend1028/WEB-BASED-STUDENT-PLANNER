const todoList = [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const todo = todoObject.value;
    const html = `
      <div class="todo_object">${todo}</div>
      <button class="delete_button">Delete</button> 
    `;
    todoListHTML += html;
  });

  document.querySelector('.task_container')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.delete_button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    }); 
}

document.querySelector('.add_something')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.input_field');
  const inputValue = inputElement.value;

  todoList.push({
    value: inputValue
  });

  inputElement.value = '';

  renderTodoList();
}