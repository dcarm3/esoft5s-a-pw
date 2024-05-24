const taskKey = '@tasks'

function addTask(event) {
    event.preventDefault()
    const taskId = new Date().getTime()
    const taskList = document.querySelector('#taskList')

    const form = document.querySelector('#taskForm')
    const formData = new FormData(form)

    const taskTitle = formData.get('title')
    const taskDescription = formData.get('description')

    const li = document.createElement('li')

    li.id = taskId
    li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
      <button class="edit-button" title="Editar tarefa">✏️</button>
    `

    taskList.appendChild(li)

    const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
    tasks.push({ id: taskId, title: taskTitle, description: taskDescription })
    localStorage.setItem(taskKey, JSON.stringify(tasks))

    form.reset()
}

window.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
    const taskList = document.querySelector('#taskList')
    taskList.innerHTML = tasks.map((task) => `
        <li id="${task.id}">
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <button class="edit-button" title="Editar tarefa">✏️</button>
        </li>`).join('')

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', openEditDialog)
    })
})

function openEditDialog(event) {
    const li = event.target.closest('li')
    const taskId = li.id

    const taskTitle = li.querySelector('h2').textContent
    const taskDescription = li.querySelector('p').textContent
    const dialog = document.querySelector('#editDialog')
    dialog.querySelector('#editTitle').value = taskTitle
    dialog.querySelector('#editDescription').value = taskDescription
    dialog.showModal()
    document.querySelector('#cancelb').addEventListener('click', () => {
        dialog.close()
    })
}
