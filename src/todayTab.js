import { renderTaskList } from './utils';
import taskStore from './taskStore';

const today = () => {
    const main = document.querySelector('#content');
    main.className = '';
    main.classList.add( 'today-tab');

    let taskContainer = document.querySelector('#task-container');
    if (!taskContainer) {
        taskContainer = document.createElement('div');
        taskContainer.id = 'task-container';
        main.appendChild(taskContainer);
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const todayTasks = taskStore.tasks.filter(task => task.date === currentDate);
    renderTaskList(todayTasks);
};

export default today;