import Todo from './todo.js';

/**
 * ProjectManager - for every project, this will manage all the todos related to it.
 * This is the interface the main controller will work with to manipulate the todos within that project.
 */
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
      console.log(todo.title);
    });
  }

  // Update

  // Delete
}
