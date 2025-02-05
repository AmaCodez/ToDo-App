import "./styles.css";
import allTask from "./mytask";
import completed from "./completedTab";
import today from "./todayTab";
import upcoming from "./upcomingTab";
import taskStore from "./taskStore";
import { renderProjects, loadProjectTasks, removeAllContent } from './projectUtils';


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

export function createProject(projectName) {
    if (!projectName.trim()) {
        console.error("Project name is required");
        return;
    }

    // Prevent duplicate projects
    if (taskStore.projects.some(project => project.name === projectName)) {
        console.warn("Project already exists");
        return;
    }

    // Store project as an object with an empty tasks array
    taskStore.projects.push({ name: projectName, tasks: [] });

    // Create project button dynamically
    const projectContainer = document.querySelector(".project-content");
    const projectBtn = document.createElement("button");
    projectBtn.textContent = projectName;
    projectBtn.classList.add("project-item"); // Ensure this matches your CSS

    projectBtn.addEventListener("click", () => {
        loadProjectTasks(projectName);
    });

    projectContainer.appendChild(projectBtn);
    console.log(`Project created: ${projectName}`);
}

document.addEventListener("DOMContentLoaded", () => {
    renderProjects(); // Render existing projects on page load

    // Attach event listener to project container to handle dynamic projects
    document.querySelector('.project-content').addEventListener('click', (event) => {
        if (event.target.classList.contains('project-item')) {
            const projectName = event.target.textContent.trim();
            loadProjectTasks(projectName); // Load only this project's tasks
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let activeTab = "myTasks";
    // Load default tab
    allTask();

    const allTaskTab = document.querySelector("#myTasks");
    const todayTaskTab = document.querySelector("#todayTask");
    const completedTaskTab = document.querySelector("#completedTask");
    const upcomingTaskTab = document.querySelector("#upcomingTask");

    const addTaskButton = document.querySelector('.addTaskBtn');
    const dialog = document.querySelector('#taskDialog');

    if (addTaskButton && dialog) {
        addTaskButton.addEventListener('click', () => {
            const form = dialog.querySelector('form');
            if (form) {
              form.reset();
            }
            
            // Remove any project-specific data.
            delete dialog.dataset.project;
            
            // Ensure the dialog is in "add" mode (not editing).
            taskStore.isEditing = false;
            taskStore.editIndex = null;
            
            // If you are using the same form button (.newTask) in both contexts,
            // update its text to "Add" for the global case.
            const newTaskBtn = document.querySelector('.newTask');
            if (newTaskBtn) {
              newTaskBtn.textContent = 'Add';
            }

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