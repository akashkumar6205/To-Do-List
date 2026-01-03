let taskData = {}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo ,progress ,done];
let dragElement = null;

function addTask(title, desc, column){
    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")   

    div.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>
    `
    column.appendChild(div) 

    div.addEventListener("drag", (e) => {
        dragElement = div;
    })

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
        div.remove();
        updaeTaskcount();
    })
    return div;
}

function updaeTaskcount(){
      columns.forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            taskData[ col.id] = Array.from(tasks).map(t => {
                return {
                    title: t.querySelector("h2").innerText,
                    desc: t.querySelector("p").innerText
                }
            }) 
            localStorage.setItem("taskData", JSON.stringify(taskData));
            count.innerText = tasks.length;
    })
}

if(localStorage.getItem("tasks")){

    const data = JSON.parse( localStorage.getItem("tasks") );
    

    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach( task => {
            addTask(task.title, task.desc, column);
        })
    }
    updaeTaskcount();
}



const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        // console.log("dragging", e);
        dragElement = task;
    })
})

function addDragEventsOnColumu(column){
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();



        column.appendChild(dragElement);
        column.classList.remove("hover-over");

      updaeTaskcount();
    })
}

addDragEventsOnColumu(todo);
addDragEventsOnColumu(progress);
addDragEventsOnColumu(done);

// modal related logic
const toggleModalButton = document.querySelector('#toggle-modal');
const modalBg = document.querySelector('.modal .bg');
const modal = document.querySelector('.modal');
const addTaskButton = document.querySelector('#add-new-task');

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
})
modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click", () => {
    const tasktitle = document.querySelector('#task-title-input').value
    const taskdesc = document.querySelector('#task-desc-input').value



    addTask(tasktitle, taskdesc, todo); 
    updaeTaskcount();
    modal.classList.remove("active")

    document.querySelector('#task-title-input').value = "";
    document.querySelector('#task-desc-input').value = "";
})
// modal related logic ends here
