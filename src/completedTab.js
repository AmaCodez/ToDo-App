import {myTask, displayTask} from './mytask.js';

const completed = () => {
    const main = document.querySelector('#content');
    main.className = '';
    main.classList.add = 'completed-tab';

    const completedTasks = myTask.filter(task => task.completed === true);
    displayTask(completedTasks);
};

export default completed;