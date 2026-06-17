import Todo from './Todo.js';
import CollectionManager from './CollectionManager.js';
import protectedTodoProperties from './protectedTodoProperties.js';

/**
 * TodoManager - for every project, this will manage all the todos related to it.
 */
export default class TodoManager {
  constructor(id, todoManagerProperties) {
    this.id = id;
    this.projectName = todoManagerProperties.projectName;
    this.description = todoManagerProperties.description;

    // Provide CollectionManager with the factory function that it can use to create Todos.
    this.todoCollection = new CollectionManager(
      (id, todoProperties) => new Todo(id, todoProperties),
    );
  }

  addTodo(newTodoFormData) {
    // First few properties are the default values. Then spread what the user wrote to override the values.
    // Then, use the todoCollection to create the todo.
    const todoValues = {
      title: '',
      description: '',
      dueDate: this.#createDateFormatted(Date.now()),
      isDone: false,
      ...newTodoFormData,
    };
    return this.todoCollection.createOne(todoValues);
  }

  /**
   * @param date Provide the date as a number.
   * @return string yyyy-mm-dd.
   */
  #createDateFormatted(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  // Return all todos to the caller
  getAllTodos() {
    return this.todoCollection.getAll();
  }

  // Update
  updateTodo(id, updateFormData) {
    const toUpdate = this.todoCollection.getOne(id);
    if (!toUpdate) {
      console.log(`Error: ${id} not found.`);
      return null;
    }

    // Skip updating if a property is protected.
    for (const [propertyToUpdate, updatedValue] of Object.entries(
      updateFormData,
    )) {
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
