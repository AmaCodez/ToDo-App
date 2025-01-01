import taskStore from './taskStore';

export function renderProjects() {
    const projectsContainer = document.querySelector('.project-content');
    projectsContainer.innerHTML = ''; // Clear existing projects

    taskStore.projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.textContent = project.name;
        projectDiv.dataset.index = index;

        // Add click listener to show tasks for this project
        projectDiv.addEventListener('click', () => {
            console.log(`Selected project: ${project.name}`); // You can later render tasks for this project
        });

        projectsContainer.appendChild(projectDiv);
    });
}