const allTask = () => {
    const main = ocument.querySelector('#content');
    const taskContainer = document.querySelector('#task-container');
    const newTask = document.querySelector('.newTask');
    const cancel = document.querySelector('.cancel');

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

    function addTask (name, date, priority, note){ //create a new object and push in myTask array
        const newTask = new TaskList (name, date, priority, note); 
        myTask.push(newTask);
        displayTask();
    };

    function displayTask (){ //this is how the task will display on the browser when filled
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
            taskNameInput.type = 'checkbox'; //will be appended to taskName
            taskNameInput.name = 'userListName';

            const taskDescription = document.createElement('p');
            taskDescription.classList.add('task-description');
            taskDescription.textContent = myTask[i].note;

            const taskDate = document.createElement('div');
            taskDate.classList.add('task-date');
            taskDate.textContent = myTask[i].date;

            // don't forget to add priority !, depending on the 
            //priority level

            const taskControl = document.createElement('div');
            taskControl.classList.add('task-control');
            const taskEdit = document.createElement('button');
            taskEdit.classList.add('editBtn');
            const taskDelete = document.createElement('button');
            taskDelete.classList.add('deleteBtn'); //don't forget to add image 

            taskName.appendChild(taskNameInput);

            taskItems.appendChild(taskName);
            taskItems.appendChild(taskDescription);
            taskItems.appendChild(taskDate);

            taskControl.appendChild(taskEdit);
            taskControl.appendChild(taskDelete);

            taskList.appendChild(taskItems);
            taskList.appendChild(taskControl);

            taskContainer.appendChild(taskList);  

        };
    };
 // create a button to open dialogue (card)

 cancel.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
 });

 //when you press the add button on the form it pushes to the task container
 newTask.addEventListener('click', (e) => {
    e.preventDefault();

    const taskFormName = document.querySelector('#taskName').value;
    const taskFormDate = document.querySelector('#dateBtn').value;
    const taskFormPriority = document.querySelector('#priority').value;
    const taskFormDescription = document.querySelector('#description').checked;

addBookToLibrary(bookName, bookAuthor, bookPages, bookRead);
form.reset();
dialog.close();
});
};

export default allTask;