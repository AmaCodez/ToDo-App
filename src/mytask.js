import taskStore from './taskStore';
import { renderTaskList } from './utils';

const allTask = () => {
    const main = document.querySelector('#content');
    const newTaskBtn = document.querySelector('.newTask');
    const cancel = document.querySelector('.cancel');
    const createTaskBtn = document.querySelector('.addTaskBtn');
    const dialog = document.querySelector('dialog');
    const form = document.querySelector('form');

    main.classList.add('mytask');

    let isEditing = false; 
    let editIndex = null;

    class TaskList {
        constructor (name, date, priority, note, completed = false) {
            this.name = name;
            this.date = date;
            this.priority = priority;
            this.note = note;
            this.completed = completed;
        }
    };

    function addTask (name, date, priority, note){ 
        if (isEditing) {
            // Update the existing task
            taskStore.tasks[editIndex].name = name;
            taskStore.tasks[editIndex].date = date;
            taskStore.tasks[editIndex].priority = priority;
            taskStore.tasks[editIndex].note = note;
            isEditing = false; // Reset the edit mode
            editIndex = null;
        } else {
            const newTask = new TaskList (name, date, priority, note); 
            taskStore.tasks.push(newTask);
            console.log("Task added:", taskStore.tasks); //Debugging line
        }
       renderTaskList(taskStore.tasks);
    };

function setupEventListeners () {

    // createTaskBtn.addEventListener('click', () => {
    //     dialog.showModal();
    //  });
    
     newTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Add button clicked');
    
        const taskFormName = document.querySelector('#taskName').value;
        const taskFormDate = document.querySelector('#dueDate').value;
        const taskFormPriority = document.querySelector('#priority').value;
        const taskFormDescription = document.querySelector('#description').value;
    
    addTask(taskFormName, taskFormDate, taskFormPriority, taskFormDescription);

    form.reset();
    dialog.close();
    });

    cancel.addEventListener('click', (event) => {
        event.preventDefault();
        dialog.close();
     });

}
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    setupEventListeners ();
});

// Function to open the edit dialog with the selected task's data
window.editTask = (task, index) => {
    isEditing = true;
    editIndex = index;

    //Pre-fill form with existitng task data
    document.querySelector('#taskName').value = task.name;
    document.querySelector('#dueDate').value = task.date;
    document.querySelector('#priority').value = task.priority;
    document.querySelector('#description').value = task.note;

    dialog.showModal();
};

}

export default allTask;