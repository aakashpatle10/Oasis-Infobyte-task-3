let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        addedAt: new Date()
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    const pendingTasks = document.getElementById("pendingTasks");
    const completedTasks = document.getElementById("completedTasks");

    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.className = task.completed ? "completed" : "";

        const taskContent = document.createElement("span");
        taskContent.textContent = `${task.text} (Added: ${task.addedAt.toLocaleString()})`;

        const buttons = document.createElement("div");
        buttons.className = "task-buttons";

     
        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.onclick = () => toggleCompleteTask(task.id);
        buttons.appendChild(completeBtn);

       
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(task.id);
        buttons.appendChild(editBtn);

        
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(task.id);
        buttons.appendChild(deleteBtn);

        listItem.appendChild(taskContent);
        listItem.appendChild(buttons);

        if (task.completed) {
            completedTasks.appendChild(listItem);
        } else {
            pendingTasks.appendChild(listItem);
        }
    });
}

function toggleCompleteTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newTaskText = prompt("Edit Task", task.text);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            task.text = newTaskText.trim();
            renderTasks();
        }
    }
}


document.addEventListener("DOMContentLoaded", renderTasks);
