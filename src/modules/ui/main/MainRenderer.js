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

  #renderProjectName(todoManager) {
    const projectName = document.createElement('h2');
    projectName.textContent = todoManager
      ? todoManager.projectName
      : 'Please select a project';
    this.projectNameContainer.replaceChildren();
    this.projectNameContainer.appendChild(projectName);
  }

  #renderTodos(todoManager) {
    this.todosContainer.replaceChildren();
    const allTodos = todoManager.getAllTodos();

    // For each entry in the storage.
    for (const [id, todo] of allTodos.entries()) {
      // Create the todo class - title, description
      const todoDiv = document.createElement('div');
      todoDiv.classList = 'todo';
      todoDiv.id = id;
      // Fill in the text content accordingly
      const titleDiv = document.createElement('div');
      titleDiv.classList = 'title';
      titleDiv.textContent = todo.title;

      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList = 'description';
      descriptionDiv.textContent = todo.description;

      // Append child to the todosContainer
      todoDiv.appendChild(titleDiv);
      todoDiv.appendChild(descriptionDiv);
      this.todosContainer.appendChild(todoDiv);
    }
  }
}
