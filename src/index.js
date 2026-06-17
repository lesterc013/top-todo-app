import ProjectManager from './modules/domain/ProjectManager.js';
import ProjectController from './modules/controller/ProjectController.js';
import TodoController from './modules/controller/TodoController.js';
import MainRenderer from './modules/ui/main/MainRenderer.js';
import SidebarRenderer from './modules/ui/sidebar/SidebarRenderer.js';
import styles from '../src/styles.css';

const projectManager = new ProjectManager();
const twm = projectManager.createNewTodoManager({
  projectName: 'TWM',
  description: 'Bulldog rat ass',
});
const lck = projectManager.createNewTodoManager({ projectName: 'LCK' });
const edsel = projectManager.createNewTodoManager({ projectName: 'Edsek' });

projectManager.setActiveTodoManager(twm.id);

projectManager.activeTodoManager.addTodo({
  title: 'TWM go home early',
  description: 'Take bag and zhao',
});
const toUpdate = projectManager.activeTodoManager.addTodo({
  title: 'Go for meeting',
  description: 'Bring LCK along',
});

projectManager.activeTodoManager.updateTodo(toUpdate.id, {
  title: 'Change title',
});

// RENDERERS
const sidebarContainer = document.querySelector('.sidebar');
const sidebarRenderer = new SidebarRenderer(sidebarContainer, projectManager);
sidebarRenderer.render();

const mainContainer = document.querySelector('.main');
const projectNameContainer = document.querySelector('.project-name');
const todosContainer = document.querySelector('.todos');
const newTodoModal = document.querySelector('.new-todo-modal');
const newTodoBtn = document.querySelector('.new-todo-btn');
const mainRenderer = new MainRenderer(
  mainContainer,
  projectNameContainer,
  todosContainer,
  newTodoModal,
  newTodoBtn,
);

// CONTROLLERS
const projectController = new ProjectController(projectManager, mainRenderer);
const todoController = new TodoController(projectManager, mainRenderer);

// Change active todo manager on hashchange i.e. user clicked new manager from the sidebar.
window.onhashchange = () =>
  projectController.handleActiveTodoManagerChanged(
    window.location.hash.substring(1),
  );

newTodoBtn.addEventListener('click', (e) => {
  // If there is no active, we shouldnt open the modal - what to tell the user?
  newTodoModal.showModal();
});

// Handle todo update form submitted.
todosContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  todoController.handleUpdateTodo(formData);
});
