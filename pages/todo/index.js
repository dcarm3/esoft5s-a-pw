const taskKey = '@tasks';

function addTask(event) {
    event.preventDefault();
    const taskId = new Date().getTime();
    const taskList = document.querySelector('#taskList');

    const form = document.querySelector('#taskForm');
    const formData = new FormData(form);

    const taskTitle = formData.get('title');
    const taskDescription = formData.get('description');
    const li = document.createElement('li');

    li.id = taskId;
    li.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDescription}</p>
        <button class="edit-button" title="Editar tarefa">✏️</button>
        <button class="delete-button" title="Excluir tarefa">❌</button>
    `;

    taskList.appendChild(li);

    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
    localStorage.setItem(taskKey, JSON.stringify(tasks));

    form.reset();

    li.querySelector('.edit-button').addEventListener('click', openEditDialog);
    li.querySelector('.delete-button').addEventListener('click', deleteTask);
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const taskList = document.querySelector('#taskList');
    
    taskList.innerHTML = tasks.map(task => `
        <li id="${task.id}">
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <button class="edit-button" title="Editar tarefa">✏️</button>
            <button class="delete-button" title="Excluir tarefa">❌</button>
        </li>
    `).join('');

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', openEditDialog);
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', deleteTask);
    });
}

function openEditDialog(event) {
    const li = event.target.closest('li');
    const taskId = li.id;
    const taskTitle = li.querySelector('h2').textContent;
    const taskDescription = li.querySelector('p').textContent;

    const dialog = document.querySelector('#editDialog');
    dialog.querySelector('#editTitle').value = taskTitle;
    dialog.querySelector('#editDescription').value = taskDescription;

    dialog.showModal();

    document.querySelector('#editDialog form').onsubmit = function(event) {
        event.preventDefault();
        editTask(taskId, dialog.querySelector('#editTitle').value, dialog.querySelector('#editDescription').value);
        dialog.close();
    };

    document.querySelector('#cancelButton').addEventListener('click', () => {
        dialog.close();
    });
}

function editTask(taskId, newTitle, newDescription) {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const taskIndex = tasks.findIndex(task => task.id == taskId);
    if (taskIndex > -1) {
        tasks[taskIndex].title = newTitle;
        tasks[taskIndex].description = newDescription;
        localStorage.setItem(taskKey, JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(event) {
    const li = event.target.closest('li');
    const taskId = li.id;

    let tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    tasks = tasks.filter(task => task.id != taskId);
    localStorage.setItem(taskKey, JSON.stringify(tasks));
    li.remove();
}

window.addEventListener('DOMContentLoaded', loadTasks);
