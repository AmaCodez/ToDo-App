import taskStore from '.taskStore';
import { renderTaskList } from './utils';

const allTask = () => {
    const main = document.querySelector('#content');
    const newTaskBtn = document.querySelector('.newTask');
    const cancel = document.querySelector('.cancel');
    const createTaskBtn = document.querySelector('.addTaskBtn');
    const dialog = document.querySelector('dialog');
    const form = document.querySelector('form');

    main.classList.add('mytask');

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
        const newTask = new TaskList (name, date, priority, note); 
        taskStore.tasks.push(newTask);
       renderTaskList(taskStore.tasks);
    };

function setupEventListeners () {

    createTaskBtn.addEventListener('click', () => {
        dialog.showModal();
     });
    
     cancel.addEventListener('click', (event) => {
        event.preventDefault();
        dialog.close();
     });
    
     newTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
    
        const taskFormName = document.querySelector('#taskName').value;
        const taskFormDate = document.querySelector('#dateBtn').value;
        const taskFormPriority = document.querySelector('#priority').value;
        const taskFormDescription = document.querySelector('#description').value;
    
    addTask(taskFormName, taskFormDate, taskFormPriority, taskFormDescription);
    form.reset();
    dialog.close();
    });

}
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    setupEventListeners ();
});

}

export default allTask;