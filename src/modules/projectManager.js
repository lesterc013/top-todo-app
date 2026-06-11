import Todo from './todo.js';

export default class ProjectManager {
  constructor() {
    this.todos = [];
  }

  // Create - instantiate a new Todo object, and store it in todos array
  createNewTodo(title) {
    this.todos.push(new Todo(title));
  }

  // Read
  displayAllTodos() {
    this.todos.forEach((todo) => {
      console.log(todo.readTodo());
    });
  }

  // Update

  // Delete
}
