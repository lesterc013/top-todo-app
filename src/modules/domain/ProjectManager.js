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
    this.currentPM = null;
  }

  createNewPm(formData) {
    const projectValues = {
      projectName: '',
      description: '',
      ...formData,
    };
    return this.todoManagerCollection.createOne(projectValues);
  }

  getOnePm(id) {
    return this.todoManagerCollection.getOne(id);
  }

  getAllPMs() {
    return this.todoManagerCollection.getAll();
  }

  removePM(id) {
    return this.todoManagerCollection.deleteOne(id);
  }

  // TODO: Implement this correctly.
  // changePM(id) {
  //   const pm = this.projectManagers.get(id);
  //   if (!pm) {
  //     console.log(`Error. Can't find PM of id ${id}`);
  //     return null;
  //   }

  //   this.currentPM = pm;
  //   return this.currentPM;
  // }
}
