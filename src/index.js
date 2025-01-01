import "./styles.css";
import allTask from "./mytask";
import completed from "./completedTab";
import today from "./todayTab";
import upcoming from "./upcomingTab";
import taskStore from "./taskStore";
// import { renderProjects } from './projectUtils';

// export function removeAllContent() {
//     // taskStore.isEditing = false; 
//     // taskStore.editIndex = null; 

//     const main = document.querySelector("#content");
//     if (main) {
//         main.innerHTML = '';
//         const taskContainer = document.createElement('div');
//         taskContainer.id = 'task-container';
//         main.appendChild(taskContainer);
//         console.log('Task container added back to the DOM');
//     } else {
//         console.log("Main content area not found!");
//     }
// }

const newProjectBtn = document.querySelector('.projectsBtn');
const newProjectDialog = document.querySelector('#newProjectDialog');
const addProjectBtn = document.querySelector('.addProjectBtn');
const cancelProjectBtn = document.querySelector('.cancelProjectBtn');
const projectsContainer = document.querySelector('.project-content');

newProjectBtn.addEventListener('click', () => {
    newProjectDialog.showModal();
});

addProjectBtn.addEventListener('click', (event) => {
    event.preventDefault(); 

    const projectName = document.querySelector('#projectName').value.trim();

    if (projectName) {
        
        taskStore.projects.push({ name: projectName, tasks: [] });
        renderProjects(); 
        newProjectDialog.close();
    } else {
        alert('Project name cannot be empty!');
    }
});

cancelProjectBtn.addEventListener('click', () => {
    newProjectDialog.close();
});

export function removeAllContent() {
    const taskContainer = document.querySelector('#task-container');
    if (taskContainer) {
        taskContainer.innerHTML = ''; // Clear only the task list content
        console.log('Task container content cleared');
    } else {
        console.error('Task container not found!');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let activeTab = "myTasks";
    // Load default tab
    allTask();

    const allTaskTab = document.querySelector("#myTasks");
    const todayTaskTab = document.querySelector("#todayTask");
    const completedTaskTab = document.querySelector("#completedTask");
    const upcomingTaskTab = document.querySelector("#upcomingTask");

    const addTaskButton = document.querySelector('.addTaskBtn');
    const dialog = document.querySelector('dialog');

    if (addTaskButton && dialog) {
        addTaskButton.addEventListener('click', () => {
            dialog.showModal();
                });
    } else {
             console.error("Add Task button or dialog not found.");
         }

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

        upcomingTaskTab.addEventListener("click", () => {
            activeTab = "upcomingTasks";
            removeAllContent();
            upcoming();
            console.log('upcoming button clicked');
        });

        completedTaskTab.addEventListener("click", () => {
            activeTab = "completedTasks";
            removeAllContent();
            completed();
            console.log('completed button clicked');
        });
    } else {
        console.error("One or more tab buttons not found!");
    }

});