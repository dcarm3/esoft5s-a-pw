function enviar() {
    const formulario = document.getElementById("formTarefas");
    let titulo = document.getElementById("titulo").value;
    let descricao = document.getElementById("descricao").value;

    let listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    listaTarefas.push({ titulo: titulo, descricao: descricao });
    localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
}

function carregarTarefas() {
    const lista = document.querySelector(".listaTarefas");
    lista.innerHTML = "";
    let listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    listaTarefas.forEach(function (tarefa) {
        const item = document.createElement("li");
        item.innerText = `Título: ${tarefa.titulo}, Descrição: ${tarefa.descricao}`;
        lista.appendChild(item);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    carregarTarefas();
})