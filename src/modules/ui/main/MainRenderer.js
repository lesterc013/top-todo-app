import { createNewTodoForm, createTodoUpdateForm } from './todoFormCreator.js';
import main from './main.css';

export default class MainRenderer {
  constructor(
    mainContainer,
    projectNameContainer,
    todosContainer,
    newTodosModal,
    newTodosButton,
  ) {
    this.mainContainer = mainContainer;
    this.projectNameContainer = projectNameContainer;
    this.todosContainer = todosContainer;

    this.#renderProjectNameContainer();
    newTodosModal.appendChild(createNewTodoForm());
    newTodosButton.hidden = true;
  }

  renderMainContainerFor(todoManager) {
    this.#renderProjectNameContainer(todoManager);
    this.#renderTodosContainer(todoManager);
  }

  #renderProjectNameContainer(todoManager) {
    const projectName = document.createElement('h2');
    projectName.textContent = todoManager
      ? todoManager.projectName
      : 'Please select a project';
    this.projectNameContainer.replaceChildren();
    this.projectNameContainer.appendChild(projectName);
  }

  #renderTodosContainer(todoManager) {
    this.todosContainer.replaceChildren();
    const allTodos = todoManager.getAllTodos();

    // For each entry in the storage.
    for (const [todoId, todo] of allTodos.entries()) {
      // Create the details element - class=todo, id=todo id
      const details = document.createElement('details');
      details.classList = 'todo';
      details.id = todoId;
      // summary element text content will be the Title - Due Date (if available)
      const summary = document.createElement('summary');
      summary.textContent = todo.title;

      const form = createTodoUpdateForm(todo);
      form.setAttribute('method', 'post');

      details.appendChild(summary);
      details.appendChild(form);
      this.todosContainer.appendChild(details);
    }
  }
}
