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
    console.log(` Loading tasks for project: ${projectName}`);
   
    removeAllContent(); // Clears the current task display

    const project = taskStore.projects.find(p => p.name === projectName);
    
    if (project) {
        console.log(`✅ Found project: ${projectName}, Tasks:`, project.tasks);

        if (project.tasks.length === 0) {
            console.warn(`⚠️ No tasks found for project "${projectName}"`);
        }
        // Render the tasks inside the selected project
        renderTaskList(project.tasks);  

        // Create and display the "+ Add Task" button inside the project view
        // const main = document.querySelector('#content');
        // const addTaskBtn = document.createElement('button');
        // addTaskBtn.textContent = '+ Add Task';
        // addTaskBtn.className = 'projectAddTaskBtn';
        // main.appendChild(addTaskBtn);

        // Event listener for adding tasks inside the project
        // addTaskBtn.addEventListener("click", () => {
        //     openTaskForm(projectName); // Opens task form for this project
        // });

        let existingBtn = document.querySelector('.projectAddTaskBtn');
        if (!existingBtn) {
            
            const main = document.querySelector('#content');
            const addTaskBtn = document.createElement('button');
            addTaskBtn.textContent = '+ Add Task';
            addTaskBtn.className = 'projectAddTaskBtn';
            main.appendChild(addTaskBtn);

            // Attach event listener only once
            addTaskBtn.addEventListener("click", () => {
                openTaskForm(projectName);
            });
        }
    } else {
        console.warn(`❌ Project "${projectName}" not found.`);
    }
}

export function openTaskForm(projectName) {
    console.log(`Creating task for project: ${projectName}`);
    const taskDialog = document.querySelector('#taskDialog');
    taskDialog.dataset.project = projectName; // Store project name for later reference

    // Reset form to prevent pre-filled data
    document.querySelector('#taskName').value = "";
    document.querySelector('#dueDate').value = "";
    document.querySelector('#priority').value = "none"; // Set default priority
    document.querySelector('#description').value = "";

    // Ensure it's in "add mode" and not "edit mode"
    taskStore.isEditing = false;
    taskStore.editIndex = null;
    document.querySelector('.newTask').textContent = "Add";

    taskDialog.showModal();

    // Select the correct button for adding project tasks
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
                loadProjectTasks(projectName); // Refresh tasks in the project
                taskDialog.close();
            } else {
                alert("Task name cannot be empty!");
            }
        };
    }

    // if (!projectAddTaskBtn) {
    //     console.error("⚠️ Project Add Task button not found!");
    //     return;
    // }

    // if (projectAddTaskBtn) {
    //     projectAddTaskBtn.removeEventListener('click', handleProjectTaskAdd);
    //     projectAddTaskBtn.addEventListener('click', handleProjectTaskAdd);
    // }

    // Remove any previous event listener to prevent multiple calls
    // projectAddTaskBtn.removeEventListener("click", handleProjectTaskAdd);

    // Define the event listener function
    // function handleProjectTaskAdd(event) {
    //     event.preventDefault();

    //     const taskFormName = document.querySelector("#taskName").value.trim();
    //     const taskFormDate = document.querySelector("#dueDate").value;
    //     const taskFormPriority = document.querySelector("#priority").value;
    //     const taskFormDescription = document.querySelector("#description").value;

    //     const selectedProject = taskDialog.dataset.project;

    //     console.log(` Creating task for project: ${selectedProject}`);

    //     if (taskFormName) {
    //         addTask(taskFormName, taskFormDate, taskFormPriority, taskFormDescription, selectedProject);
    //         loadProjectTasks(selectedProject); // Refresh the tasks in the project
    //         taskDialog.close();
    //     } else {
    //         alert("Task name cannot be empty!");
    //     }
    // }

    // Attach event listener (ONLY ONCE)
    // projectAddTaskBtn.addEventListener("click", handleProjectTaskAdd);
}
