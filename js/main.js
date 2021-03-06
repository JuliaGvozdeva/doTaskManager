const formTask = document.querySelector("#newTaskForm");
const taskList = document.querySelector("#taskList");
const cardContainer = document.querySelector("#cardContainer");
const input =  document.querySelector("#addNewTask");

// Добавление новой задачи
formTask.addEventListener("submit", function(event){
    // отмена стандартного поведения страницы
    event.preventDefault();

    // Получение введенного текста в input
    const taskText = input.value.trim();
    const taskHTML = `<li class="list-group-item d-flex justify-content-between"><span contenteditable="true" class="task-title">${taskText}</span>
    <div id="buttons-task">
        <button type="button" data-action="ready" class="btn btn-light align-self-end btn-done">Готово</button>
        <button type="button" data-action="delete-task" class="btn btn-light align-self-end btn-delete">Удалить</button>
    </div></li>`

    // Добавление новой задачи 
    taskList.insertAdjacentHTML("afterbegin", taskHTML);
    input.value = "";
    input.focus;
    
    // Скрытие сообщения о пустом списке задач
    hideEmptyList();

    // Добавление нотификаций
    allerts('add', taskText);
});

// Прослушивания событий внутри каждой задачи
taskList.addEventListener("click", function(event){
     // находим родительский тег <li>
     const parentElement = event.target.closest(".list-group-item");

     // Находим содержимое задачи
     const taskName = parentElement.firstChild.innerHTML;

    if (event.target.getAttribute("data-action") == "delete-task"){
        // Если кликнули на кнопку удалить, то удаляем элемент
        parentElement.remove();

        // Если задач не осталось, то показываем сообщение, что список задач пуст
        hideEmptyList();

        // Показываем нотификацию
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

// Отображения нотификаций
function allerts(val, taskName){
    // Очищаем предыдущие нотификации
    if (document.querySelector("#removeAllert")){
        removeAllert.remove();
    }

    // Проверка отображения нотификаций 
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

    // Местоположение добавления нотификаций
    cardContainer.insertAdjacentHTML("beforebegin", allertsHTML);

    // Удаление нотификации через заданный промежуток времени
    setTimeout(() => {
        removeAllert.remove();
    }, 800);
};

// Отображения/скрытия сообщения о пустом списке задач
function hideEmptyList(){
    if (taskList.childElementCount > 1) {
        document.querySelector("#emptyListItem").style.display = "none";
    }
    else {
        document.querySelector("#emptyListItem").style.display = "block";
    }
};
