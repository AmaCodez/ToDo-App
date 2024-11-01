import taskStore from './taskStore';
import { renderTaskList } from './utils';
import { editTask } from './index.js';

const allTask = () => {
    const main = document.querySelector('#content');
    main.className = '';
    main.classList.add('mytask');

    const newTaskBtn = document.querySelector('.newTask');
    const cancel = document.querySelector('.cancel');
    const dialog = document.querySelector('dialog');
    const form = document.querySelector('form');

    class TaskList {
        constructor (name, date, priority, note, completed = false) {
            this.name = name;
            this.date = date;
            this.priority = priority;
            this.note = note;
            this.completed = completed;
        }
    };

    function filterAndRenderMyTasks() {
        const myTasks = taskStore.tasks.filter(task => !task.completed && (!task.date || isTodayOrUpcoming(task.date)));
        renderTaskList(myTasks);
    }

    function isTodayOrUpcoming(date) {
        const today = new Date();
        const taskDate = new Date(date);
        return taskDate >= today; 
    }

    filterAndRenderMyTasks();

    function addTask (name, date, priority, note){ 
        console.log('Inside addTask:', { name, date, priority, note });

        if (!name || name.trim() === '') {
            console.error('Task name is required');
            return;
        }

        console.log('isEditing:', isEditing, 'editIndex:', editIndex);

        if (window.isEditing) {
            if (window.editIndex !== null && editIndex >= 0 && editIndex < taskStore.tasks.length) {
                taskStore.tasks[editIndex].name = name;
                taskStore.tasks[editIndex].date = date;
                taskStore.tasks[editIndex].priority = priority;
                taskStore.tasks[editIndex].note = note;
    
                console.log("Task updated at index:", editIndex, taskStore.tasks[editIndex]);
            } else {
                console.error("Invalid editIndex, task not updated");
            }
         } else {
            const newTask = new TaskList (name, date, priority, note); 
            taskStore.tasks.push(newTask);
            console.log("Task added:", taskStore.tasks);
        }
     
        window.isEditing = false; 
        window.editIndex = null;
        newTaskBtn.textContent = 'Add';

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
            
            addTask(taskFormName, taskFormDate, taskFormPriority, taskFormDescription);

            form.reset();
            dialog.close();

        });
    } else {
        console.error('newTaskBtn not found!');
    }
     
    if(cancel) {
        cancel.addEventListener('click', (event) => {
            event.preventDefault();
            form.reset();
            dialog.close();
         });
    }
}


    setupEventListeners ();

// Function to open the edit dialog with the selected task's data
window.editTask = (task, index) => {
    editTask(task, index);
    // isEditing = true;
    // editIndex = index;

    // newTaskBtn.textContent = 'Update';

    // console.log('Editing task at index:', editIndex, task);

    // console.log('isEditing is now:', isEditing);

    // //Pre-fill form with existitng task data
    // document.querySelector('#taskName').value = task.name;
    // document.querySelector('#dueDate').value = task.date;
    // document.querySelector('#priority').value = task.priority;
    // document.querySelector('#description').value = task.note;

    // dialog.showModal();
};

}

export default allTask;