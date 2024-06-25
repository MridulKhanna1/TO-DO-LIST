const taskInput = document.getElementById('task-input');
const taskPriority = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

let tasks = [];

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const taskPriorityValue = taskPriority.value;
    if (taskText) {
        const task = {
            text: taskText,
            priority: taskPriorityValue,
            completed: false
        };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
        taskPriority.value = 'low';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskHTML = `
            <li class="task ${task.completed? 'task-completed' : ''}">
                <span>${task.text}</span>
                <span class="priority ${task.priority}">${task.priority}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <button class="complete-btn" data-index="${index}">${task.completed? 'Undo' : 'Complete'}</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const completeBtns = document.querySelectorAll('.complete-btn');
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', deleteTask);
    });
    completeBtns.forEach((btn) => {
        btn.addEventListener('click', toggleCompleted);
    });
    updateTaskCount();
}

function deleteTask(event) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    renderTasks();
}

function toggleCompleted(event) {
    const index = event.target.dataset.index;
    tasks[index].completed =!tasks[index].completed;
    renderTasks();
}

function updateTaskCount() {
    const completedTasks = tasks.filter((task) => task.completed);
    taskCount.textContent = `${tasks.length} tasks, ${completedTasks.length} completed`;
}

clearCompletedBtn.addEventListener('click', clearCompletedTasks);

function clearCompletedTasks() {
    tasks = tasks.filter((task) =>!task.completed);
    renderTasks();
}

renderTasks();