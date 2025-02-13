import taskStore from './taskStore';
import { renderTaskList } from './utils';

export function isTodayOrUpcoming(task) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time component from today
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0); // Remove time component from taskDate


    if (taskDate < today) {
        return 'overdue'; 
    } else if (taskDate.getTime() === today.getTime()) {
        return 'today'; 
    } else {
        return 'upcoming'; 
    }
}

 let renderInProgress = false;

function filterAndRenderMyTasks() {
    if (renderInProgress) {
        console.warn("Render already in progress. Skipping...");
        return;
    }

    renderInProgress = true;
    const myTasks = taskStore.tasks.filter(task => !task.completed);
    console.log('Filtered tasks for rendering:', myTasks);
    renderTaskList(myTasks);

    // Reset flag after rendering
    renderInProgress = false;
}

export function addTask (name, date, priority, note, project = null) { 
    console.log('Inside addTask:', { name, date, priority, note, project });
    console.log('isEditing:', taskStore.isEditing, 'editIndex:', taskStore.editIndex);

    if (!name || name.trim() === '') {
        console.error('Task name is required');
        alert('Task name cannot be empty!');
        return;
    }

    if (taskStore.isEditing) {
        if (taskStore.editIndex !== null && taskStore.editIndex >= 0) {
            if (project) {
                // Find the project and update the task inside it
                const targetProject = taskStore.projects.find(p => p.name === project);
                if (targetProject && taskStore.editIndex < targetProject.tasks.length) {
                    targetProject.tasks[taskStore.editIndex] = { name, date, priority, note, project };
                    console.log(` ✅ Updated task in project "${project}" at index ${taskStore.editIndex}:`, targetProject.tasks);
                } else {
                    console.error(` ❌ Project "${project}" not found or invalid index!`);
                }
            } else {
                // Update general tasks (not in a project)
                taskStore.tasks[taskStore.editIndex] = { name, date, priority, note, project };
                console.log(" ✅ Task successfully updated at index:", taskStore.editIndex, taskStore.tasks[taskStore.editIndex]);
            }
        } //else {
            //console.error(" ❌ Invalid editIndex, task not updated");
       // }
    } else {
        // Creating a new task
        const newTask = { name, date, priority, note, project, completed: false };

        console.log(`📌 addTask() called with project: "${project}"`);

        if (project) {
            console.log(`🔍 Checking project "${project}" before adding task...`);
            const targetProject = taskStore.projects.find(p => p.name === project);
            if (targetProject) {
                console.log(`Found project:`, targetProject);
                targetProject.tasks.push(newTask);
                taskStore.tasks.push(newTask); // Add to the general task list
                console.log(` ✅ Task added to project "${project}":`, targetProject.tasks);
                renderTaskList(targetProject.tasks); 
            } else {
                console.error(` ❌ Project "${project}" not found!`);
            }
        } else {
            // If no project, add to general taskStore.tasks
            taskStore.tasks.push(newTask);
            console.log("✅ Task added to general list.");
            filterAndRenderMyTasks();
        }
    }

    filterAndRenderMyTasks();
    console.log('Current projects:', taskStore.projects);
}

const allTask = (projectName = null) => {
    const main = document.querySelector('#content');
    main.className = '';
    main.classList.add('mytask');

    const newTaskBtn = document.querySelector('.newTask');
    const cancel = document.querySelector('.cancel');
    const dialog = document.querySelector('#taskDialog');
    const form = document.querySelector('form');

     // Filter tasks by project if projectName is provided
     const filteredTasks = taskStore.tasks.filter(task => 
        projectName ? task.project === projectName : !task.completed
    );

    console.log('Filtered tasks for rendering:', filteredTasks);
    renderTaskList(filteredTasks);

    // Set up the event listeners for task form handling
    setupEventListeners(projectName);

    // let isEditing = false; 
    // let editIndex = null;

    class TaskList {
        constructor (name, date, priority, note, completed = false) {
            this.name = name;
            this.date = date;
            this.priority = priority;
            this.note = note;
            this.completed = completed;
        }
    };

    
    filterAndRenderMyTasks();

function setupEventListeners (projectName = null) {

    if(newTaskBtn && !newTaskBtn.listenerAttached){
        console.log('newTaskBtn found, attaching listener');

        newTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Add button clicked');
        
            const taskFormName = document.querySelector('#taskName').value;
            const taskFormDate = document.querySelector('#dueDate').value;
            const taskFormPriority = document.querySelector('#priority').value;
            const taskFormDescription = document.querySelector('#description').value;
       
            const selectedProject = document.querySelector('#taskDialog').dataset.project || null;

            console.log('Before addTask:',{
                isEditing: taskStore.isEditing,
                editIndex: taskStore.editIndex,
                taskFormName,
                taskFormDate,
                taskFormPriority,
                taskFormDescription,
                selectedProject,
            });

            if (taskStore.isEditing) {
                addTask(taskFormName, taskFormDate, taskFormPriority, taskFormDescription, selectedProject);
                taskStore.isEditing = false;
                taskStore.editIndex = null;
                newTaskBtn.textContent = 'Add';
            } else {
                addTask(taskFormName, taskFormDate, taskFormPriority, taskFormDescription, selectedProject);
            }

        form.reset();
        dialog.close();

        });

        newTaskBtn.listenerAttached = true; // Prevents attaching listener multiple times
    } else if (!newTaskBtn) {
        console.error('newTaskBtn not found!');
    }
     
    if(cancel) {
        cancel.addEventListener('click', (event) => {
            event.preventDefault();
            dialog.close();
         });
    }
}


    setupEventListeners ();

// Function to open the edit dialog with the selected task's data
window.editTask = (task, index) => {
    taskStore.isEditing = true;
    taskStore.editIndex = index;

    newTaskBtn.textContent = 'Update';

    console.log('Editing task at index:', taskStore.editIndex, task);

    console.log('isEditing is now:', taskStore.isEditing);

    //Pre-fill form with existitng task data
    document.querySelector('#taskName').value = task.name;
    document.querySelector('#dueDate').value = task.date;
    document.querySelector('#priority').value = task.priority;
    document.querySelector('#description').value = task.note;

    dialog.showModal();
};

}

export default allTask;
