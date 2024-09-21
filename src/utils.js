import editImg from '../asset/pencil.png';
import deleteImg from '../asset/delete.png';

export function renderTaskList(taskArray) {
    const taskContainer = document.querySelector('#task-container');
    taskContainer.innerHTML = ''; 

        taskArray.forEach((task, index) => {

            const taskList = document.createElement('div');
            taskList.classList.add('task-list');

            const taskItems = document.createElement('div');
            taskItems.classList.add('task-items');

            const priority = task.priority;
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
            taskNameInput.checked = task.completed;

            taskNameInput.addEventListener ('change', () => {
                task.completed = taskNameInput.checked; // Update the completed status based on checkbox
                renderTaskList(taskArray);
            });

            const taskDescription = document.createElement('p');
            taskDescription.classList.add('task-description');
            taskDescription.textContent = task.note;

            const taskDate = document.createElement('div');
            taskDate.classList.add('task-date');
            taskDate.textContent = task.date;

            const taskControl = document.createElement('div');
            taskControl.classList.add('task-control');

            const taskEdit = document.createElement('button');
            taskEdit.classList.add('editBtn');
            taskEdit.addEventListener('click', () => {
                const taskToEdit = task;

                // Pre-fill the form fields with the selected task's data
                document.querySelector('#taskName').value = taskToEdit.name;
                document.querySelector('#dateBtn').value = taskToEdit.date; // Adjust this to use a proper date input
                document.querySelector('#priority').value = taskToEdit.priority;
                document.querySelector('#description').value = taskToEdit.note;
            
                const dialog = document.querySelector('dialog');
                dialog.showModal();
            });

            const editBtn = document.createElement('img');
            editBtn.classList.add('edit-button');
            editBtn.src = editImg;
            editBtn.alt = 'edit icon';

            const taskDelete = document.createElement('button');
            taskDelete.classList.add('deleteBtn'); 

            taskDelete.addEventListener('click', () => {
                taskArray.splice(index, 1);
                renderTaskList(taskArray); //Refresh the task list display
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

        });
}