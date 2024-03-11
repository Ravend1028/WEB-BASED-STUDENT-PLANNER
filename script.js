if ("Notification" in window) {
  Notification.requestPermission().then(function (permission) {
    if (Notification.permission !== "granted") {
      alert("Please allow notification access!");
      location.reload();
    }
  });
}

let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let timeoutIds = [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { text, time, date } = todoObject;
    const html = `
      <div class="todo_object">${text}</div>
      <div class="todo_object">${time}</div>
      <div class="todo_object">${date}</div>
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
    scheduleReminder();
  });

function addTodo() {
  const inputElement = document.querySelector('.input_field');
  const inputValue = inputElement.value;

  const timeElement = document.querySelector('.time_field');
  const timeValue = timeElement.value;

  const dateElement = document.querySelector('.date_field');
  const dateValue = dateElement.value;

  todoList.push({
    text: inputValue,
    time: timeValue,
    date: dateValue
  });

  inputElement.value = '';
  timeElement.value = '';
  dateElement.value = '';

  renderTodoList();
}

function scheduleReminder() {
  const inputElement = document.querySelector('.input_field');
  const timeElement = document.querySelector('.time_field');
  const dateElement = document.querySelector('.date_field');

  const inputValue = inputElement.value;
  const timeValue = timeElement.value;
  const dateValue = dateElement.value;

  const dateTimeString = dateValue + " " + timeValue;
  const scheduledTime = new Date(dateTimeString);
  const currentTime = new Date();
  const timeDifference = scheduledTime - currentTime;

  if (timeDifference > 0) {
    addTodo();

    let timeoutId = setTimeout(function () {
      document.querySelector('.notificationSound').play();

      let notification = new Notification("To-Do:", {
        body: inputValue,
        requireInteraction: true,
      });
    }, timeDifference);

    timeoutIds.push(timeoutId);
  } else {
    alert("The scheduled time is in the past!");
  }
}