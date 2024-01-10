//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".b-new-task__input");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.querySelector(".b-tasks-todo__task-list");
var completedTasksHolder=document.querySelector(".b-tasks-completed__task-list");

var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add("b-task");
    var checkBox=document.createElement("input");
    checkBox.classList.add("b-task__checkbox");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");

    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");

    label.innerText=taskString;
    label.className="b-task__label";

    checkBox.type="checkbox";
    editInput.type="text";
    editInput.classList.add("b-input-text", "b-task__value");

    editButton.innerText="Edit";
    editButton.classList.add("b-btn_edit", "b-btn");

    deleteButton.classList.add("b-task__btn-del", "b-btn");
    deleteButtonImg.src="./remove.svg";
    deleteButtonImg.classList.add("b-task__img-del");
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector("input[type=text]");
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".b-btn_edit");
    var containsClass=listItem.classList.contains("b-task_edit-mode");

    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("b-task_edit-mode");
};

var deleteTask=function(){
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);
}

var taskCompleted=function(){
    var listItem=this.parentNode;
    listItem.children[1].classList.add("b-task-completed__label");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
    var listItem=this.parentNode;
    listItem.children[1].classList.remove("b-task-completed__label");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
    var checkBox=taskListItem.querySelector(".b-task__checkbox");
    var editButton=taskListItem.querySelector(".b-btn_edit");
    var deleteButton=taskListItem.querySelector(".b-task__btn-del");

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.