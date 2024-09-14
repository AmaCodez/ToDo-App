import editImg from '../asset/pencil.png';
import deleteImg from '../asset/delete.png';

const allTask = () => {
    const main = document.querySelector('#content');
    const taskContainer = document.querySelector('#task-container');
    const newTaskBtn = document.querySelector('.newTask');
    const cancel = document.querySelector('.cancel');
    const createTaskBtn = document.querySelector('.addTaskBtn');
    const dialog = document.querySelector('dialog');
    const form = document.querySelector('form');
    const prioritySelect = document.querySelector('#priority');

    main.classList.add('mytask');

    const myTask = [];

    class TaskList {
        constructor (name, date, priority, note) {
            this.name = name;
            this.date = date;
            this.priority = priority;
            this.note = note;
        }
    };

    function addTask (name, date, priority, note){ 
        const newTask = new TaskList (name, date, priority, note); 
        myTask.push(newTask);
        displayTask();
    };
   
    const displayTask = (function (){
        for(let i = 0; i < myTask.length; i++) {
            taskContainer.innerHTML = null;

            const taskList = document.createElement('div');
            taskList.classList.add('task-list');

            const taskItems = document.createElement('div');
            taskItems.classList.add('task-items');

            const taskName = document.createElement('label');
            taskName.id = 'task-name';
            taskName.textContent = myTask[i].name;
            const taskNameInput = document.createElement('input');
            taskNameInput.type = 'checkbox'; 
            taskNameInput.name = 'userListName';

            const taskDescription = document.createElement('p');
            taskDescription.classList.add('task-description');
            taskDescription.textContent = myTask[i].note;

            const taskDate = document.createElement('div');
            taskDate.classList.add('task-date');
            taskDate.textContent = myTask[i].date;

            const taskControl = document.createElement('div');
            taskControl.classList.add('task-control');
            const taskEdit = document.createElement('button');
            taskEdit.classList.add('editBtn');
            taskEdit.addEventListener('click', () => {
                dialog.showModal(); // but it needs to open that card with the details inside.
            });

            const editBtn = document.createElement('image');
            editBtn.classList.add('edit-button');
            editBtn.src = editImg;
            editBtn.alt = 'edit icon';

            const taskDelete = document.createElement('button');
            taskDelete.classList.add('deleteBtn'); //don't forget to add image 
            // create an 'are you sure?' form before it deletes competly 
            taskDelete.addEventListener('click', () => {
                taskContainer.removeChild(taskList);  
            });

            const deleteBtn = document.createElement('image');
            deleteBtn.classList.add('edit-button');
            deleteBtn.src = deleteImg;
            deleteBtn.alt = 'delete icon';

            taskName.appendChild(taskNameInput);

            taskItems.appendChild(taskName);
            taskItems.appendChild(taskDescription);
            taskItems.appendChild(taskDate);

            taskEdit.appendChild(editBtn);
            taskDelete.appendChild(deleteBtn);

            taskControl.appendChild(taskEdit);
            taskControl.appendChild(taskDelete);

            taskList.appendChild(taskItems);
            taskList.appendChild(taskControl);

            taskContainer.appendChild(taskList);  

        };
    }) ();

// include an IIFE
 const taskBtns = ( function () {
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
})();

}

export default allTask;