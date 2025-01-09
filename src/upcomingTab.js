import { renderTaskList } from './utils';
import taskStore from './taskStore';
import { isTodayOrUpcoming } from './mytask';

const upcoming = () => {
    const main = document.querySelector('#content');
    main.className = '';
    main.classList.add( 'today-tab');

    let taskContainer = document.querySelector('#task-container');
    if (!taskContainer) {
        taskContainer = document.createElement('div');
        taskContainer.id = 'task-container';
        main.appendChild(taskContainer);
    }

    // const upcomingTasks = taskStore.tasks.filter(task => isTodayOrUpcoming(task) === 'upcoming');
    const upcomingTasks = taskStore.tasks.filter(task => 
        task.date && task.date.trim() !== '' // Ensure the task has a valid date
    );
    console.log('Filtered tasks for Today tab:', upcomingTasks);
    renderTaskList(upcomingTasks);
};

export default upcoming;