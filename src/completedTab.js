
import { renderTaskList } from './utils';
import taskStore from './taskStore';

const completed = () => {
    const main = document.querySelector('#content');
    main.className = '';
    main.classList.add('completed-tab');

    const completedTasks = taskStore.tasks.filter(task => task.completed === true);
    renderTaskList(completedTasks);
};

export default completed;
