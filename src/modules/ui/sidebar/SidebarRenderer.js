/**
 * Renders the Sidebar through data provided by ProjectManager
 */
export default class SidebarRenderer {
  constructor(renderContainer, projectManager) {
    this.renderContainer = renderContainer;
    this.projectManager = projectManager;
  }

  // Create a list of the project names. Render it in the sidebar as a ul first.
  render() {
    this.renderContainer.replaceChildren();

    const ul = document.createElement('ul');

    // Map returned by the ProjectManager method.
    const todoManagers = this.projectManager.getAllTodoManagers();
    for (const todoManager of todoManagers.values()) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${todoManager.id}`;
      const span = document.createElement('span');
      span.textContent = `${todoManager.projectName}`;

      a.appendChild(span);
      li.appendChild(a);
      ul.appendChild(li);
    }

    this.renderContainer.appendChild(ul);
  }
}
