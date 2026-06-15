/**
 * AppController will be the main class that holds all the PMs.
 * At any point in time, it will have a current PM - where we manipulate whatever we need to do with that PM's todos.
 */

import CollectionManager from './CollectionManager.js';
import ProjectManager from './ProjectManager.js';

export default class ProjectManager {
  constructor() {
    this.projectManagerCollection = new CollectionManager(
      (id, projectManagerProperties) =>
        new ProjectManager(id, projectManagerProperties),
    );
    this.currentPM = null;
  }

  createNewPm(formData) {
    const projectValues = {
      projectName: '',
      description: '',
      ...formData,
    };
    return this.projectManagerCollection.createOne(projectValues);
  }

  getOnePm(id) {
    return this.projectManagerCollection.getOne(id);
  }

  getAllPMs() {
    return this.projectManagerCollection.getAll();
  }

  removePM(id) {
    return this.projectManagerCollection.deleteOne(id);
  }

  changePM(id) {
    const pm = this.projectManagers.get(id);
    if (!pm) {
      console.log(`Error. Can't find PM of id ${id}`);
      return null;
    }

    this.currentPM = pm;
    return this.currentPM;
  }
}
