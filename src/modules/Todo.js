/**
 * Keep the Todo class simple - only a data storage class.
 */
export default class Todo {
  constructor(id, todoProperties) {
    this.id = id;
    this.title = todoProperties.title;
    this.description = todoProperties.description;
    this.dueDate = todoProperties.dueDate;
    this.isDone = todoProperties.isDone;
  }
}
