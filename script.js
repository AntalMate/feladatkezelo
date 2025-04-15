const addTaskButton = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Feladatok betöltése LocalStorage-ból
document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToList(task);
    });
});

// Feladat hozzáadása
addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = { text: taskText };
        addTaskToList(task);
        saveTaskToLocalStorage(task);
        taskInput.value = "";
    }
});

// Feladatok hozzáadása a listához
function addTaskToList(task) {
    const li = document.createElement("li");
    li.textContent = task.text;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Törlés";
    deleteButton.addEventListener("click", () => {
        li.remove();
        deleteTaskFromLocalStorage(task.text);
    });
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Feladatok mentése LocalStorage-ba
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Feladat törlése LocalStorage-ból
function deleteTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
