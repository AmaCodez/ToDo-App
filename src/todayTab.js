import { renderTaskList } from './utils';
import taskStore from './taskStore';

const today = () => {
    const main = document.querySelector('#content');
    main.className = '';
    main.classList.add( 'today-tab');

    const todayTasks = taskStore.tasks.filter(task => task.date === !currentDate);
    renderTaskList(todayTasks);
};

export default today;