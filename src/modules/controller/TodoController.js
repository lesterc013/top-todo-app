export default class TodoController {
  constructor(projectManager, mainRenderer) {
    this.projectManager = projectManager;
    this.mainRenderer = mainRenderer;
  }

  handleUpdateTodo(formData) {
    const formDataObj = Object.fromEntries(formData.entries());

    // Need to manually create the isDone property because when checkboxes are ticked, they will appear in the submission and vice versa.
    formData.has('isDone')
      ? (formDataObj.isDone = true)
      : (formDataObj.isDone = false);
    console.log(formDataObj);

    // Call the activeTodoManager to update the todo
    const active = this.projectManager.activeTodoManager;
    active.updateTodo(formDataObj.id, formDataObj);
    // Then rerender the todos
    this.mainRenderer.renderMainContainerFor(active);
  }
}
