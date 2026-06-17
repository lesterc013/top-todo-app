import ProjectManager from './modules/domain/ProjectManager.js';
import MainRenderer from './modules/ui/main/MainRenderer.js';
import SidebarRenderer from './modules/ui/sidebar/SidebarRenderer.js';
import styles from '../src/styles.css';

const projManager = new ProjectManager();
const twm = projManager.createNewTodoManager({
  projectName: 'TWM',
  description: 'Bulldog rat ass',
});
const lck = projManager.createNewTodoManager({ projectName: 'LCK' });
const edsel = projManager.createNewTodoManager({ projectName: 'Edsek' });

projManager.setActiveTodoManager(twm.id);

projManager.activeTodoManager.addTodo({
  title: 'TWM go home early',
  description: 'Take bag and zhao',
});
const toUpdate = projManager.activeTodoManager.addTodo({
  title: 'Go for meeting',
  description: 'Bring LCK along',
});

projManager.activeTodoManager.updateTodo(toUpdate.id, {
  title: 'Change title',
});

const sidebarContainer = document.querySelector('.sidebar');
const sidebarRenderer = new SidebarRenderer(sidebarContainer, projManager);
sidebarRenderer.render();

const mainContainer = document.querySelector('.main');
const projectNameContainer = document.querySelector('.project-name');
const todosContainer = document.querySelector('.todos');
const mainRenderer = new MainRenderer(
  mainContainer,
  projectNameContainer,
  todosContainer,
);

// Handler to change todos rendered based on the hash change which is the ID of the specific TodoManager.
function changeActiveTodoManager() {
  const id = window.location.hash.substring(1);
  const newActive = projManager.setActiveTodoManager(id);
  if (!newActive) {
    console.log(`Error. ID ${id} not found.`);
    return;
  }
  mainRenderer.renderTodosFor(newActive);
}
// Set the event listener onhashchange
window.onhashchange = changeActiveTodoManager;

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
  const active = projManager.activeTodoManager;
  active.updateTodo(formDataObj.id, formDataObj);
  // Then rerender the todos
  mainRenderer.renderTodosFor(active);
});
