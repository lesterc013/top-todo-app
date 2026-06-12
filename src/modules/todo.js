/**
 * Keep the Todo class simple - only a data storage class.
 */
export default class Todo {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.description = 'Default';
    this.dueDate = 'To set a date object';
    this.priority =
      'Some dynamically set number based on some indexing logic of a todo';
    this.isDone = false;
  }
}
