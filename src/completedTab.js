
import { renderTaskList } from './utils';
import taskStore from './taskStore';

const completed = () => {
    const main = document.querySelector('#content');
    main.className = '';
    main.classList.add('completed-tab');

    let taskContainer = document.querySelector('#task-container');
    if (!taskContainer) {
        taskContainer = document.createElement('div');
        taskContainer.id = 'task-container';
        main.appendChild(taskContainer);
    }

    const completedTasks = taskStore.tasks.filter(task => task.completed);
    renderTaskList(completedTasks);
};

export default completed;
