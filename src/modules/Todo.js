/**
 * Keep the Todo class simple - only a data storage class.
 */
export default class Todo {
  constructor(id, values) {
    this.id = id;
    this.title = values.title;
    this.description = values.description;
    this.dueDate = values.dueDate;
    this.isDone = values.isDone;
  }
}
