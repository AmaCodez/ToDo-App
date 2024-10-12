import "./styles.css";
import allTask from "./mytask";
import completed from "./completedTab";
import today from "./todayTab";

// allTask();

export function removeAllContent() {
    const main = document.querySelector("#content");
    if (main) {
        main.innerHTML = '';
        const taskContainer = document.createElement('div');
        taskContainer.id = 'task-container';
        main.appendChild(taskContainer);
        console.log('Task container added back to the DOM');
    } else {
        console.log("Main content area not found!");
    }
}

// document.addEventListener("DOMContentLoaded", () => {
//     const addTaskButton = document.querySelector('.addTaskBtn');
//     const dialog = document.querySelector('dialog');

//     if (addTaskButton && dialog) {
//         addTaskButton.addEventListener('click', () => {
//             dialog.showModal();
//         });
//     } else {
//         console.error("Add Task button or dialog not found.");
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    // Load default tab
    allTask();

    const allTaskTab = document.querySelector("#myTasks");
    const todayTaskTab = document.querySelector("#todayTask");
    const completedTaskTab = document.querySelector("#completedTask");

    const addTaskButton = document.querySelector('.addTaskBtn');
    const dialog = document.querySelector('dialog');

    if (addTaskButton && dialog) {
        addTaskButton.addEventListener('click', () => {
            dialog.showModal();
                });
         } else {
             console.error("Add Task button or dialog not found.");
         }

    // Event listeners for tab switching
    if (allTaskTab && todayTaskTab && completedTaskTab) {
        allTaskTab.addEventListener("click", () => {
            removeAllContent();
            allTask();
            console.log('alltask button clicked');
        });

        todayTaskTab.addEventListener("click", () => {
            removeAllContent();
            today();
            console.log('today button clicked');
        });

        completedTaskTab.addEventListener("click", () => {
            removeAllContent();
            completed();
            console.log('completed button clicked');
        });
    } else {
        console.error("One or more tab buttons not found!");
    }
});

// const allTaskTab = document.querySelector("#myTasks");
// allTaskTab.addEventListener("click", () => {
//     removeAllContent();
//     allTask();
// });

// const todayTaskTab = document.querySelector("#todayTask");
// todayTaskTab.addEventListener("click", () => {
//     removeAllContent();
//     today();
// });

// const completedTaskTab= document.querySelector("#completedTask");
// completedTaskTab.addEventListener("click", () => {
//     removeAllContent();
//     completed();
// });

// export function removeAllContent() {
//     const main = document.querySelector("#content")
//     main.innerHTML = '';
// };