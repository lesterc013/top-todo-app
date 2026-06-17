import ProjectManager from './modules/domain/ProjectManager.js';
import ProjectController from './modules/controller/ProjectController.js';
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
const mainRenderer = new MainRenderer(
  mainContainer,
  projectNameContainer,
  todosContainer,
);

// CONTROLLERS
const projectController = new ProjectController(projectManager, mainRenderer);
// Set the event listener onhashchange
window.onhashchange = () =>
  projectController.handleActiveTodoManagerChanged(
    window.location.hash.substring(1),
  );

// Attach form submission event listener here rather than MainRenderer to decouple dependencies.
todosContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formDataObj = Object.fromEntries(formData.entries());

  // Need to manually create the isDone property because when checkboxes are ticked, they will appear in the submission and vice versa.
  formData.has('isDone')
    ? (formDataObj.isDone = true)
    : (formDataObj.isDone = false);
  console.log(formDataObj);

  // Call the activeTodoManager to update the todo
  const active = projectManager.activeTodoManager;
  active.updateTodo(formDataObj.id, formDataObj);
  // Then rerender the todos
  mainRenderer.renderTodosFor(active);
});
