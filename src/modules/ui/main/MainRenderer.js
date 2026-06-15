export default class MainRenderer {
  constructor(renderContainer) {
    this.renderContainer = renderContainer;
    // TODO: Need to hold active TodoManager?
  }

  renderTodos(todoManager) {
    console.log(todoManager.getAllTodos());
  }
}
