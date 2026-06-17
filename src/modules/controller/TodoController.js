export default class TodoController {
  constructor(mainRenderer) {
    this.mainRenderer = mainRenderer;
  }

  #preprocessForm(formData) {
    const formDataObj = Object.fromEntries(formData.entries());
    formData.has('isDone')
      ? (formDataObj.isDone = true)
      : (formDataObj.isDone = false);
    return formDataObj;
  }

  handleUpdateTodo(activeTodoManager, formData) {
    const formDataObj = this.#preprocessForm(formData);

    activeTodoManager.updateTodo(formDataObj.id, formDataObj);
    // Then rerender the todos
    this.mainRenderer.renderMainContainerFor(activeTodoManager);
  }

  handleAddTodo(activeTodoManager, formData) {
    const formDataObj = this.#preprocessForm(formData);

    activeTodoManager.addTodo(formDataObj);
    // Then rerender the todos
    this.mainRenderer.renderMainContainerFor(activeTodoManager);
  }
}
