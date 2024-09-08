const allTask = () => {
    const inputTask = document.querySelector('.input-task');
const addBtn = document.querySelector('.addBtn');
const taskContainer = document.querySelector('#task-container');

    function taskValue () {
    const task = inputTask.value;
    inputTask.value = '';

    return {task};
};

addBtn.addEventListener('click', () => {
   const {task} = taskValue();

    const taskListCont = document.createElement('div');
    taskListCont.classList.add('list-container');

    const checklistCont = document.createElement('div');
    checklistCont.classList.add('checklist-container');

    const checklistInput = document.createElement('input');
    checklistInput.type = 'checkbox';
    checklistInput.id = 'userTask';
    const checklistLabel = document.createElement('label');
    checklistLabel.for = 'userTask';
    checklistLabel.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.textContent = 'delete';

    deleteBtn.addEventListener('click', () => {
        taskContainer.removeChild(taskListCont);
    });

    checklistCont.appendChild(checklistInput);
    checklistCont.appendChild(checklistLabel);
    taskListCont.appendChild(checklistCont);
    taskListCont.appendChild(deleteBtn);

   taskContainer.appendChild(taskListCont);
    
});

};

export default allTask;