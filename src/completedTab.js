
import { renderTaskList } from './utils';
import {myTask} from './mytask';

const completed = () => {
    const main = document.querySelector('#content');
    main.className = '';
    main.classList.add('completed-tab');

    const completedTasks = myTask.filter(task => task.completed === true);
    renderTaskList(completedTasks);
};

export default completed;
