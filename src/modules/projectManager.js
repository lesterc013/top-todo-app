import Todo from './todo.js';
import protectedTodoProperties from './protectedTodoProperties.js';

/**
 * ProjectManager - for every project, this will manage all the todos related to it.
 * This is the interface the app controller will work with to manipulate the todos within that project.
 */
export default class ProjectManager {
  constructor(id, projectName) {
    this.id = id;
    this.projectName = projectName;
    this.todos = new Map();
  }

  // Create - instantiate a new Todo object, and store it in todos array
  // Returns the new todo to caller.
  // TODO: Should provide an object containing all the properties of the todo rather than just a title - cos this at the end of the day will originate from a form.
  addTodo(title) {
    const newTodo = new Todo(crypto.randomUUID(), title);
    this.todos.set(newTodo.id, newTodo);
    return newTodo;
  }

  // Return all todos to the caller
  getAllTodos() {
    return this.todos;
  }

  // Update
  updateTodo(id, submittedValues) {
    const toUpdate = this.todos.get(id);
    if (!toUpdate) {
      console.log(`Error: ${id} not found.`);
      return null;
    }

    for (const [propertyToUpdate, updatedValue] of Object.entries(
      submittedValues,
    )) {
      if (protectedTodoProperties.has(propertyToUpdate)) {
        console.log(`Skipping property: ${propertyToUpdate}`);
        continue;
      }

      if (!Object.hasOwn(toUpdate, propertyToUpdate)) {
        console.log(`Error: property: ${propertyToUpdate} not found in todo.`);
        continue;
      }

      // Only update if not 'id', and property exists.
      toUpdate[propertyToUpdate] = updatedValue;
    }

    return toUpdate;
  }

  // Delete. Return T/F if todo has been successfully deleted.
  deleteTodo(id) {
    return this.todos.delete(id);
  }
}
