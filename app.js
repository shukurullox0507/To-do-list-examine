
// Get the elements from the DOM
const inputTask = document.querySelector('.input-task');
const addBtn = document.querySelector('.add-btn');
const taskList = document.querySelector('.task-list');
const clearBtn = document.querySelector('.clear-btn');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks in the list
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        li.innerHTML += `<span class="icons">
                      <i class="fas fa-check check"></i>
                      <i class="fas fa-edit edit"></i>
                      <i class="fas fa-trash delete"></i>
                     </span>`;
        taskList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const task = inputTask.value.trim();
    if (task) {
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        inputTask.value = '';
        inputTask.focus();
    }
}

// Edit a task
function editTask(index) {
    const newTask = prompt('Edit task:', tasks[index]);
    if (newTask) {
        tasks[index] = newTask.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Complete a task
function completeTask(li, index) {
    li.classList.toggle('completed');
    tasks[index] = li.textContent;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete a task
function deleteTask(li, index) {
    li.remove();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks
function clearTasks() {
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Event listeners
addBtn.addEventListener('click', addTask);
inputTask.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        addTask();
    }
});
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('check')) {
        const li = event.target.parentNode.parentNode;
        const index = Array.from(taskList.children).indexOf(li);
        completeTask(li, index);
    } else if (event.target.classList.contains('edit')) {
        const li = event.target.parentNode.parentNode;
        const index = Array.from(taskList.children).indexOf(li);
        editTask(index);
    } else if (event.target.classList.contains('delete')) {
        const li = event.target.parentNode.parentNode;
        const index = Array.from(taskList.children).indexOf(li);
        deleteTask(li, index);
    }
});
clearBtn.addEventListener('click', clearTasks);

// Render the initial tasks
renderTasks();


