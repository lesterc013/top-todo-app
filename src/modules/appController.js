/**
 * AppController will be the main class that holds all the PMs.
 * At any point in time, it will have a current PM - where we manipulate whatever we need to do with that PM's todos.
 */

import ProjectManager from './projectManager.js';

export default class AppController {
  constructor() {
    this.projectManagers = new Map();
    this.currentPM = null;
  }

  createNewPM(projectName) {
    const newPM = new ProjectManager(crypto.randomUUID(), projectName);
    this.projectManagers.set(newPM.id, newPM);
    return newPM;
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

  removePM(id) {
    return this.projectManagers.delete(id);
  }
}
