import taskStore from './taskStore';
import { renderTaskList } from './utils';

export function renderProjects() {
    const projectsContainer = document.querySelector('.project-content');
    projectsContainer.innerHTML = ''; // Clear existing projects

    taskStore.projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.textContent = project.name;
        projectDiv.dataset.index = index;

        // Add click listener to show tasks for this project
        projectDiv.addEventListener('click', () => {
            console.log(`Selected project: ${project.name}`); // You can later render tasks for this project
        });

        projectsContainer.appendChild(projectDiv);
    });
}

export function removeAllContent() {
    const taskContainer = document.querySelector('#task-container');
    if (taskContainer) {
        taskContainer.innerHTML = ''; // Clear only the task list content
        console.log('Task container content cleared');
    } else {
        console.error('Task container not found!');
    }
}

export function loadProjectTasks(projectName) {
    console.log(`Loading tasks for project: ${projectName}`);

    removeAllContent(); // Clears the current task display

    const project = taskStore.projects.find(p => p.name === projectName);
    
    if (project) {
        console.log(`Found project: ${projectName}, Tasks:`, project.tasks);

        // Render the tasks inside the selected project
        renderTaskList(project.tasks);  

        // Create and display the "+ Add Task" button inside the project view
        const main = document.querySelector('#content');
        const addTaskBtn = document.createElement('button');
        addTaskBtn.textContent = '+ Add Task';
        addTaskBtn.className = 'projectAddTaskBtn';
        main.appendChild(addTaskBtn);

        // Event listener for adding tasks inside the project
        addTaskBtn.addEventListener("click", () => {
            openTaskForm(projectName); // Opens task form for this project
        });
    } else {
        console.warn(`Project "${projectName}" not found.`);
    }
}

function handleProjectTaskAdd(event) {
    event.preventDefault();

    const taskFormName = document.querySelector("#taskName").value.trim();
    const taskFormDate = document.querySelector("#dueDate").value;
    const taskFormPriority = document.querySelector("#priority").value;
    const taskFormDescription = document.querySelector("#description").value;

    if (taskFormName) {
        const projectName = document.querySelector("#taskDialog").dataset.project; // Get project name from dialog attribute
        const newTask = { 
            name: taskFormName, 
            date: taskFormDate, 
            priority: taskFormPriority, 
            note: taskFormDescription 
        };

        // Find the selected project and add the new task
        const project = taskStore.projects.find(p => p.name === projectName);
        if (project) {
            project.tasks.push(newTask);
        }

        console.log(`Added task to project: ${projectName}`, newTask);
        document.querySelector("#taskDialog").close();
        loadProjectTasks(projectName);
    } else {
        alert("Task name cannot be empty!");
    }
}

// Ensure only **one** event listener is attached
document.addEventListener("DOMContentLoaded", () => {
    const projectAddTaskBtn = document.querySelector('.projectAddTaskBtn');
    if (projectAddTaskBtn) {
        projectAddTaskBtn.addEventListener("click", handleProjectTaskAdd);
    }
});

export function openTaskForm(projectName) {
    const taskDialog = document.querySelector('#taskDialog');
    taskDialog.dataset.project = projectName; // Store project name for later reference
    taskDialog.showModal();
}

// export function openTaskForm(projectName) {
//     const taskDialog = document.querySelector('#taskDialog');
//     taskDialog.showModal();

//     // Ensure we target only the project-specific add task button
//     const projectAddTaskBtn = document.querySelector('.projectAddTaskBtn');

//     if (!projectAddTaskBtn) {
//         console.error("Project Add Task button not found!");
//         return;
//     }

//     // Remove any previously attached event listener to prevent duplicate events
//     projectAddTaskBtn.removeEventListener("click", handleProjectTaskAdd);

//     // Define the event handler function
//     function handleProjectTaskAdd(event) {
//         event.preventDefault();

//         const taskFormName = document.querySelector("#taskName").value.trim();
//         const taskFormDate = document.querySelector("#dueDate").value;
//         const taskFormPriority = document.querySelector("#priority").value;
//         const taskFormDescription = document.querySelector("#description").value;

//         if (taskFormName) {
//             const newTask = { 
//                 name: taskFormName, 
//                 date: taskFormDate, 
//                 priority: taskFormPriority, 
//                 note: taskFormDescription 
//             };

//             // Find the selected project and add the new task
//             const project = taskStore.projects.find(p => p.name === projectName);
//             if (project) {
//                 project.tasks.push(newTask);
//             }

//             console.log(`Added task to project: ${projectName}`, newTask);
//             taskDialog.close();
//             loadProjectTasks(projectName); // Refresh project tasks
//         } else {
//             alert("Task name cannot be empty!");
//         }
//     }

//     // Attach event listener only once
//     projectAddTaskBtn.addEventListener("click", handleProjectTaskAdd);
// }