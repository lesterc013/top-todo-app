import Todo from './todo.js';

/**
 * ProjectManager - for every project, this will manage all the todos related to it.
 * This is the interface the app controller will work with to manipulate the todos within that project.
 */
export default class ProjectManager {
  constructor(id, projectName) {
    this.id = id;
    this.projectName = projectName;
    this.todos = {};
  }

  // Create - instantiate a new Todo object, and store it in todos array
  createNewTodo(title) {
    const newTodo = new Todo(crypto.randomUUID(), title);
    this.todos[newTodo.id] = newTodo;
    console.log(`Added todo: id: ${newTodo.id}, todo: ${this.todos[newTodo.id].title}`)
  }

  // Return all todos to the caller 
  getAllTodos() {
    return this.todos;
  }

  // TODO: Update

  // TODO: Delete
  // deleteTodo(id) {
  //   const toDelete = this.todos.find(t => t.id === id);
  // }
}
