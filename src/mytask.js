const allTask = () => {
    const taskContainer = document.querySelector('#task-container');


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
    };

    function displayTask (){
        for(let i = 0; i < myTask.length; i++) {
            taskContainer.innerHTML = null;
        };
    };

};

export default allTask;