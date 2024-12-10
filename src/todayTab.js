import { renderTaskList } from './utils';
import taskStore from './taskStore';
import { isTodayOrUpcoming } from './mytask';

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

    // const currentDate = new Date().toISOString().split('T')[0];
    // const todayTasks = taskStore.tasks.filter(task => task.date === currentDate);
    const todayTasks = taskStore.tasks.filter(task => isTodayOrUpcoming(task) === 'today');
    console.log('Filtered tasks for Today tab:', todayTasks);
    renderTaskList(todayTasks);
};

export default today;