/**
 * ProjectManager - manages all the projects i.e. TodoManagers within the app.
 */

import CollectionManager from './CollectionManager.js';
import TodoManager from './TodoManager.js';

export default class ProjectManager {
  constructor() {
    // Create a CollectionManager and give it the factory function to create a TodoManager.
    this.todoManagerCollection = new CollectionManager(
      (id, todoManagerProperties) => new TodoManager(id, todoManagerProperties),
    );
    this.activeTodoManager = null;
  }

  createNewTodoManager(formData) {
    const projectValues = {
      projectName: '',
      description: '',
      ...formData,
    };
    return this.todoManagerCollection.createOne(projectValues);
  }

  getOneTodoManager(id) {
    return this.todoManagerCollection.getOne(id);
  }

  getAllTodoManagers() {
    return this.todoManagerCollection.getAll();
  }

  remove(id) {
    return this.todoManagerCollection.deleteOne(id);
  }

  setActiveTodoManager(id) {
    const newTodoManager = this.getOneTodoManager(id);
    if (!newTodoManager) {
      console.log(`Error: Todo Manager id: ${id} not found`);
      return null;
    }

    this.activeTodoManager = newTodoManager;
    return this.activeTodoManager;
  }
}
