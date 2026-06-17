export default class ProjectController {
  constructor(projectManager, mainRenderer) {
    this.projectManager = projectManager;
    this.mainRenderer = mainRenderer;
  }

  handleActiveTodoManagerChanged(id) {
    const newActive = this.projectManager.setActiveTodoManager(id);
    if (!newActive) {
      console.log(`Error. ID ${id} not found.`);
      return;
    }

    this.mainRenderer.renderMainContainerFor(newActive);
  }
}
