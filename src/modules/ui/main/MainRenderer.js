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
    for (const [todoId, todo] of allTodos.entries()) {
      // Create the details element - class=todo, id=todo id
      const details = document.createElement('details');
      details.classList = 'todo';
      details.id = todoId;
      // summary element text content will be the Title - Due Date (if available)
      const summary = document.createElement('summary');
      summary.textContent = `${todo.title} - ${todo.dueDate ? todo.dueDate : 'No due date set'}`;

      const form = document.createElement('form');

      const title = this.#createInputRow(todo, 'title', 'text', 'Title');
      const desc = this.#createInputRow(
        todo,
        'description',
        'text',
        'Description',
      );
      const dueDate = this.#createInputRow(todo, 'due-date', 'date', 'Due');
      const isDone = this.#createInputRow(todo, 'is-done', 'checkbox', 'Done');

      form.appendChild(title);
      form.appendChild(desc);
      form.appendChild(dueDate);
      form.appendChild(isDone);

      details.appendChild(summary);
      details.appendChild(form);
      this.todosContainer.appendChild(details);
    }
  }

  #createInputRow(todoObject, inputName, inputType, labelName) {
    const row = document.createElement('div');
    row.classList = 'input-row';

    const label = document.createElement('label');
    label.setAttribute('for', inputName);
    label.textContent = `${labelName}: `;

    const input =
      inputName === 'description'
        ? document.createElement('textarea')
        : document.createElement('input');
    input.setAttribute('type', inputType);
    input.setAttribute('name', inputName);
    input.value = todoObject[inputName];
    input.id = inputName;

    row.appendChild(label);
    row.appendChild(input);
    return row;
  }
}
