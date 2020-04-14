const formTask = document.querySelector("#newTaskForm");
const taskList = document.querySelector("#taskList");
const cardContainer = document.querySelector("#cardContainer");

formTask.addEventListener("submit", function(event){
    event.preventDefault();

    const taskText = document.querySelector("#addNewTask").value;

    const taskHTML = `<li class="list-group-item d-flex justify-content-between"><span class="task-title">${taskText}</span><button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button></li>`
    document.querySelector("#addNewTask").value = "";

    taskList.insertAdjacentHTML("beforeend", taskHTML);
    allerts('add', taskText);
});

taskList.addEventListener("click", function(event){
    if (event.target.getAttribute("data-action") == "delete-task"){
        const liElement = event.target.parentElement;
        const taskName = liElement.firstChild.innerHTML;
        liElement.remove();
        allerts('remove', taskName);
    }
});

function allerts(val, taskName){
    if (document.querySelector("#removeAllert")){
        removeAllert.remove();
    }

    let allertsHTML = ""; 
    switch(val){
        case 'add':
            allertsHTML = `<div id="removeAllert" class="alert alert-warning" role="alert">Задача ${taskName} добавлена!</div>`;
            break;
        case 'remove':
            allertsHTML = `<div id="removeAllert" class="alert alert-danger" role="alert">Задача ${taskName} удалена!</div>`;
            break;
        case 'done': 
            allertsHTML = `<div class="alert alert-success" role="alert">Задача ${taskName} выполнена!</div>`;
            break;
    }

    cardContainer.insertAdjacentHTML("beforebegin", allertsHTML);

    setTimeout(() => {
        removeAllert.remove();
    }, 800);
};