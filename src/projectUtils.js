import taskStore from './taskStore';
import { addTask } from './mytask';
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
            console.log(`Selected project: ${project.name}`); 
        });

        projectsContainer.appendChild(projectDiv);
    });
}

export function removeAllContent() {
    const taskContainer = document.querySelector('#task-container');
    if (taskContainer) {
        taskContainer.innerHTML = ''; 
        console.log('Task container content cleared');
    } else {
        console.error('Task container not found!');
    }
}

export function loadProjectTasks(projectName) {
    console.log(` Loading tasks for project: ${projectName}`);
    removeAllContent(); 

    const project = taskStore.projects.find(p => p.name === projectName);
    
    if (project) {
        console.log(`✅ Found project: ${projectName}, Tasks:`, project.tasks);

        renderTaskList(project.tasks);  

        let existingBtn = document.querySelector('.projectAddTaskBtn');
        if (existingBtn) {
            existingBtn.remove();
        }

            const main = document.querySelector('#content');
            const addTaskBtn = document.createElement('button');
            addTaskBtn.textContent = '+ Add Task';
            addTaskBtn.className = 'projectAddTaskBtn';
            main.appendChild(addTaskBtn);

            addTaskBtn.addEventListener("click", () => {
                openTaskForm(projectName);
            });
    } 
}

export function openTaskForm(projectName) {
    console.log(`Creating task for project: ${projectName}`);
    const taskDialog = document.querySelector('#taskDialog');
    taskDialog.dataset.project = projectName; 

    document.querySelector('#taskName').value = "";
    document.querySelector('#dueDate').value = "";
    document.querySelector('#priority').value = "none"; 
    document.querySelector('#description').value = "";

    taskStore.isEditing = false;
    taskStore.editIndex = null;
    document.querySelector('.newTask').textContent = "Add";

    taskDialog.showModal();

    const projectAddTaskBtn = document.querySelector('.projectAddTaskBtn');
    if (projectAddTaskBtn) {
        projectAddTaskBtn.onclick = (event) => {
            event.preventDefault();

            const taskFormName = document.querySelector("#taskName").value.trim();
            const taskFormDate = document.querySelector("#dueDate").value;
            const taskFormPriority = document.querySelector("#priority").value;
            const taskFormDescription = document.querySelector("#description").value;

            console.log(`Creating task for project: ${projectName}`);

            if (taskFormName) {
                addTask(taskFormName, taskFormDate, taskFormPriority, taskFormDescription, projectName);
                loadProjectTasks(projectName); 
                taskDialog.close();
            } 
        };
    }
}
