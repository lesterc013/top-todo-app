export default class Todo {
  constructor(title) {
    this.title = title;
    this.description = 'Default';
    this.dueDate = 'To set a date object';
    this.priority =
      'Some dynamically set number based on some indexing logic of a todo';
    this.isDone = false;
  }

  readTodo() {
    return `
    ${this.title}\n
    ${this.description}\n
    ${this.dueDate}\n
    ${this.priority}\n
    ${this.isDone}\n
    `;
  }
}
