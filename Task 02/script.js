document.addEventListener("DOMContentLoaded", loadTasks);

// Function to load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = createTaskElement(task, index);
        taskList.appendChild(taskItem);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const taskList = document.getElementById("taskList");
    const taskItem = createTaskElement(taskText, tasks.length - 1);
    taskList.appendChild(taskItem);

    taskInput.value = "";
}

// Function to create a task element with edit and delete options
function createTaskElement(task, index) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const taskText = document.createElement("span");
    taskText.textContent = task;
    taskItem.appendChild(taskText);

    const editButton = document.createElement("span");
    editButton.classList.add("edit");
    editButton.textContent = "Edit";
    editButton.onclick = () => editTask(index);

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(index);

    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    return taskItem;
}

// Function to edit a task
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const newTask = prompt("Edit your task:", tasks[index]);
    if (newTask !== null) {
        tasks[index] = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
