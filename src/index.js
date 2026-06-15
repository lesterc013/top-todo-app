import ProjectManager from './modules/domain/ProjectManager.js';
import MainRenderer from './modules/ui/main/MainRenderer.js';
import SidebarRenderer from './modules/ui/sidebar/SidebarRenderer.js';

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
function handleHashChange() {
  console.log(window.location.hash.substring(1));
  const todoManagerId = window.location.hash.substring(1);
  mainRenderer.renderTodosFor(projManager.getOneTodoManager(todoManagerId));
}

window.onhashchange = handleHashChange;
