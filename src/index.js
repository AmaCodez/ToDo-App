import "./styles.css";
import allTask from "./mytask";
import completed from "./completedTab";
import today from "./todayTab";

let isEditing = false;
let editIndex = null;

export function removeAllContent() {
    const main = document.querySelector("#content");
    if (main) {
        main.innerHTML = '';
        const taskContainer = document.createElement('div');
        taskContainer.id = 'task-container';
        main.appendChild(taskContainer);
    } 
}

document.addEventListener("DOMContentLoaded", () => {
    let activeTab = "myTasks";
    allTask();

    const allTaskTab = document.querySelector("#myTasks");
    const todayTaskTab = document.querySelector("#todayTask");
    const completedTaskTab = document.querySelector("#completedTask");

    const addTaskButton = document.querySelector('.addTaskBtn');
    const dialog = document.querySelector('dialog');

    // if (addTaskButton && dialog) {
    //     addTaskButton.addEventListener('click', () => {
    //         dialog.showModal();
    //             });
    //      } 

    addTaskButton.addEventListener('click', () => {
        const taskData = {
            name: document.querySelector('#taskName').value,
            date: document.querySelector('#dueDate').value,
            priority: document.querySelector('#priority').value,
            note: document.querySelector('#description').value
        };

        if (isEditing) {
            taskStore.tasks[editIndex] = taskData;
            console.log(`Updated task at index ${editIndex}`, taskStore.tasks[editIndex]);

            isEditing = false;
            editIndex = null;
            addTaskButton.textContent = 'Add'; 
        } else {
            taskStore.tasks.push(taskData);
            console.log("New task added:", taskData);
        }

        dialog.close();
        form.reset();

        if (activeTab === "myTasks") {
            allTask();
        } else if (activeTab === "todayTasks") {
            today();
        } else if (activeTab === "completedTasks") {
            completed();
        }
    });
    
    // Event listeners for tab switching
    if (allTaskTab && todayTaskTab && completedTaskTab) {
        allTaskTab.addEventListener("click", () => {
            activeTab = "myTasks"; 
            removeAllContent();
            allTask();
            console.log('alltask button clicked');
        });

        todayTaskTab.addEventListener("click", () => {
            activeTab = "todayTasks";
            removeAllContent();
            today();
            console.log('today button clicked');
        });

        completedTaskTab.addEventListener("click", () => {
            activeTab = "completedTasks";
            removeAllContent();
            completed();
            console.log('completed button clicked');
        });
    }

    // document.querySelector('.newTask').addEventListener('click', (e) => {
    //     e.preventDefault();
        
    //     dialog.close();
        
    //     if (activeTab === "myTasks") {
    //         allTask();
    //     } else if (activeTab === "todayTasks") {
    //         today();
    //     } else if (activeTab === "completedTasks") {
    //         completed();
    //     }
    // });
});

export function editTask(task, index) {
    isEditing = true;
    editIndex = index;

    document.querySelector('#taskName').value = task.name;
    document.querySelector('#dueDate').value = task.date;
    document.querySelector('#priority').value = task.priority;
    document.querySelector('#description').value = task.note;

    addTaskButton.textContent = 'Update';
    dialog.showModal();
}