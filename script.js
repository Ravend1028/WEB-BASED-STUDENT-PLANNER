let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { text, time } = todoObject;
    const html = `
      <div class="todo_object">${text}</div>
      <div class="todo_object">${time}</div>
      <button class="delete_button">
        <i class="fa-solid fa-x" style="color: #ffffff;"></i>
      </button> 
    `;
    todoListHTML += html;
  });

  localStorage.setItem('todoList', JSON.stringify(todoList));

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

  const timeElement = document.querySelector('.time_field');
  const timeValue = timeElement.value;

  todoList.push({
    text: inputValue,
    time: timeValue
  });

  inputElement.value = '';
  timeElement.value = '';

  renderTodoList();
}