import Todo from './Todo.js';
import CollectionManager from './CollectionManager.js';
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

    // Provide CollectionManager with the factory function that it can use to create Todos.
    this.todoCollection = new CollectionManager(
      (id, todoValues) => new Todo(id, todoValues),
    );
  }

  addTodo(userInput) {
    // First few properties are the default values. Then spread what the user wrote to override the values.
    // Then, use the todoCollection to create the todo.
    const todoValues = {
      title: '',
      description: '',
      dueDate: null,
      isDone: false,
      ...userInput,
    };
    return this.todoCollection.createOne(todoValues);
  }

  // Return all todos to the caller
  getAllTodos() {
    return this.todoCollection;
  }

  // Update
  updateTodo(id, userInput) {
    const toUpdate = this.todoCollection.getOne(id);
    if (!toUpdate) {
      console.log(`Error: ${id} not found.`);
      return null;
    }

    // Skip updating if a property is protected.
    for (const [propertyToUpdate, updatedValue] of Object.entries(userInput)) {
      if (protectedTodoProperties.has(propertyToUpdate)) {
        console.log(`Skipping property: ${propertyToUpdate}`);
        continue;
      }

      // Skip update if property not in Todo schema.
      if (!Object.hasOwn(toUpdate, propertyToUpdate)) {
        console.log(`Error: property: ${propertyToUpdate} not found in todo.`);
        continue;
      }

      // Only update after the checks.
      toUpdate[propertyToUpdate] = updatedValue;
    }

    return toUpdate;
  }

  deleteTodo(id) {
    return this.todoCollection.deleteOne(id);
  }
}
