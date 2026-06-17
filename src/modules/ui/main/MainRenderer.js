import { createTodoUpdateForm } from './todoFormCreator.js';

export default class MainRenderer {
  constructor(mainContainer, projectNameContainer, todosContainer) {
    this.mainContainer = mainContainer;
    this.projectNameContainer = projectNameContainer;
    this.todosContainer = todosContainer;

    this.#renderProjectName();
  }

  renderTodosFor(todoManager) {
    this.#renderProjectName(todoManager);
    this.#renderTodos(todoManager);
  }

  // Is called when MainRenderer is first constructed, and subsequently for every renderTodosFor call.
  #renderProjectName(todoManager) {
    this.projectNameContainer.replaceChildren();

    const projectName = document.createElement('h2');

    // If called with a todoManager, provide the new todo button.
    if (todoManager) {
      projectName.textContent = todoManager.projectName;
      const newTodoBtn = document.createElement('button');
      newTodoBtn.setAttribute('type', 'button');
      newTodoBtn.textContent = 'New';
      this.projectNameContainer.appendChild(projectName);
      this.projectNameContainer.appendChild(newTodoBtn);
    } else {
      projectName.textContent = 'Please select a project';
      this.projectNameContainer.appendChild(projectName);
    }
  }

  #renderTodos(todoManager) {
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
