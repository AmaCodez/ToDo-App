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

    main.classList.add('mytask');

    const myTask = [];

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
        myTask.push(newTask);
        displayTask();
    };
   
     function displayTask (taskArray = myTask){
        taskContainer.innerHTML = '';
        for(let i = 0; i < taskArray.length; i++) {

            const taskList = document.createElement('div');
            taskList.classList.add('task-list');

            const taskItems = document.createElement('div');
            taskItems.classList.add('task-items');

            const priority = taskArray[i].priority;
            let exclamation = '';
        
            if (priority === 'high') {
                    exclamation = '!!!';
             } else if (priority === 'medium') {
                    exclamation = '!!';
            } else if (priority === 'low') {
                    exclamation = '!';
            }

            const taskName = document.createElement('label');
            taskName.id = 'task-name';
            taskName.textContent = `${exclamation} ${taskArray[i].name}`;
            const taskNameInput = document.createElement('input');
            taskNameInput.type = 'checkbox'; 
            taskNameInput.name = 'userListName';
            taskNameInput.checked = taskArray[i].completed;
            taskNameInput.addEventListener ('change', () => {
                taskArray[i].completed = taskNameInput.checked; // Update the completed status based on checkbox
                displayTask();
            });

            const taskDescription = document.createElement('p');
            taskDescription.classList.add('task-description');
            taskDescription.textContent = taskArray[i].note;

            const taskDate = document.createElement('div');
            taskDate.classList.add('task-date');
            taskDate.textContent = taskArray[i].date;

            const taskControl = document.createElement('div');
            taskControl.classList.add('task-control');
            const taskEdit = document.createElement('button');
            taskEdit.classList.add('editBtn');
            taskEdit.addEventListener('click', () => {
                const taskToEdit = taskArray[i];

                // Pre-fill the form fields with the selected task's data
                document.querySelector('#taskName').value = taskToEdit.name;
                document.querySelector('#dateBtn').value = taskToEdit.date; // Adjust this to use a proper date input
                document.querySelector('#priority').value = taskToEdit.priority;
                document.querySelector('#description').value = taskToEdit.note;
            
                dialog.showModal();
            });

            const editBtn = document.createElement('img');
            editBtn.classList.add('edit-button');
            editBtn.src = editImg;
            editBtn.alt = 'edit icon';

            const taskDelete = document.createElement('button');
            taskDelete.classList.add('deleteBtn'); 
            // create an 'are you sure?' form before it deletes competly 
            taskDelete.addEventListener('click', () => {
                myTask.splice(i, 1);
                displayTask(); //Refresh the task list display
            });

            const deleteBtn = document.createElement('img');
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

setupEventListeners ();

}

export default allTask;