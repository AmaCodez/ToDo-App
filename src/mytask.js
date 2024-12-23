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

const allTask = () => {
    const main = document.querySelector('#content');
    main.className = '';
    main.classList.add('mytask');

    const newTaskBtn = document.querySelector('.newTask');
    const cancel = document.querySelector('.cancel');
    const dialog = document.querySelector('dialog');
    const form = document.querySelector('form');

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

    // function filterAndRenderMyTasks()  {
    //     const myTasks = taskStore.tasks.filter(task => !task.completed);
    //     // const myTasks = taskStore.tasks.filter(task => !task.completed && (!task.date || isTodayOrUpcoming(task.date)));
    //     console.log('Filtered tasks for rendering:', myTasks);
    //     renderTaskList(myTasks);
    // }

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

    
    filterAndRenderMyTasks();

    function addTask (name, date, priority, note){ 

        console.log('Inside addTask:', { name, date, priority, note });
        console.log('isEditing:', taskStore.isEditing, 'editIndex:', taskStore.editIndex);

        if (!name || name.trim() === '') {
            console.error('Task name is required');
            return;
        }

        console.log('isEditing:', taskStore.isEditing, 'editIndex:', taskStore.editIndex);

        if (taskStore.isEditing) {
             if (taskStore.editIndex !== null && taskStore.editIndex >= 0 && taskStore.editIndex < taskStore.tasks.length) {
                taskStore.tasks[taskStore.editIndex].name = name;
                taskStore.tasks[taskStore.editIndex].date = date;
                taskStore.tasks[taskStore.editIndex].priority = priority;
                taskStore.tasks[taskStore.editIndex].note = note;
    
                console.log("Task successfuly updated at index:", taskStore.editIndex, taskStore.tasks[taskStore.editIndex]);
            } else {
                console.error("Invalid editIndex, task not updated");
            }
        } else {
            const newTask = new TaskList (name, date, priority, note); 
            taskStore.tasks.push(newTask);
            console.log("Task added:", taskStore.tasks);
        }
     
        filterAndRenderMyTasks();

        console.log('Task list after rendering:', taskStore.tasks);
    };

function setupEventListeners () {

    if(newTaskBtn){
        console.log('newTaskBtn found, attaching listener');

        newTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Add button clicked');
        
            const taskFormName = document.querySelector('#taskName').value;
            const taskFormDate = document.querySelector('#dueDate').value;
            const taskFormPriority = document.querySelector('#priority').value;
            const taskFormDescription = document.querySelector('#description').value;
       
            console.log('Before addTask:',{
                isEditing: taskStore.isEditing,
                editIndex: taskStore.editIndex,
                taskFormName,
                taskFormDate,
                taskFormPriority,
                taskFormDescription
            });

            if (taskStore.isEditing) {
    
                addTask(taskFormName, taskFormDate, taskFormPriority, taskFormDescription);
        
                taskStore.isEditing = false;
                taskStore.editIndex = null;
        
                newTaskBtn.textContent = 'Add';
            } else {
                addTask(taskFormName, taskFormDate, taskFormPriority, taskFormDescription);
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