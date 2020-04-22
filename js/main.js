const formTask = document.querySelector("#newTaskForm");
const taskList = document.querySelector("#taskList");
const cardContainer = document.querySelector("#cardContainer");
const input =  document.querySelector("#addNewTask");

formTask.addEventListener("submit", function(event){
    event.preventDefault();

    const taskText = input.value.trim();
    const taskHTML = `<li class="list-group-item d-flex justify-content-between"><span contenteditable="true" class="task-title">${taskText}</span>
    <div id="buttons-task">
        <button type="button" data-action="ready" class="btn btn-light align-self-end btn-done"></button>
        <button type="button" data-action="delete-task" class="btn btn-light align-self-end btn-delete"></button>
    </div></li>`
    
    taskList.insertAdjacentHTML("afterbegin", taskHTML);
    input.value = "";
    input.focus;
    
    hideEmptyList();

    allerts('add', taskText);
});

taskList.addEventListener("click", function(event){
     // находим родительский тег <li>
     const parentElement = event.target.closest(".list-group-item");
     const taskName = parentElement.firstChild.innerHTML;

    if (event.target.getAttribute("data-action") == "delete-task"){
        parentElement.remove();
        hideEmptyList();
        allerts('remove', taskName);
    }
    else if (event.target.getAttribute("data-action") == "ready"){
        // Добавляем/убираем  к тегу span дополнительный класс
        parentElement.querySelector(".task-title").classList.toggle("task-title-done");
        // Добавляем/убираем кнопке дополнительный класс
        event.target.classList.toggle("ready");

        if (event.target.classList.contains("ready")){
            // Переносим выполненную задачу в конец списка
            taskList.insertAdjacentElement("beforeend", parentElement);

            // Убираем у тега span атрибут contenteditable 
            parentElement.querySelector(".task-title").setAttribute("contenteditable", "false");

            // Показываем нотификацию
            allerts('done', taskName);
        }
        else {
             // Переносим выполненную задачу в начало списка
             taskList.insertAdjacentElement("afterbegin", parentElement);

             // Добавляем у тега span атрибут contenteditable 
             parentElement.querySelector(".task-title").setAttribute("contenteditable", "true");

             // Показываем нотификацию
            allerts('add', taskName);
        }
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
            allertsHTML = `<div id="removeAllert" class="alert alert-success" role="alert">Задача ${taskName} выполнена!</div>`;
            break;
    }

    cardContainer.insertAdjacentHTML("beforebegin", allertsHTML);

    setTimeout(() => {
        removeAllert.remove();
    }, 800);
};

function hideEmptyList(){
    if (taskList.childElementCount > 1) {
        document.querySelector("#emptyListItem").style.display = "none";
    }
    else {
        document.querySelector("#emptyListItem").style.display = "block";
    }
};