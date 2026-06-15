/**
 * CollectionManager abstracts the Create, Get, Delete logic for classes that need to do these functions.
 * The key thing here is it accepts a factory function in the constructor. This factory function will be used to instantiate the different types of things the CollectionManager stores.
 */
export default class CollectionManager {
  constructor(factory) {
    this.storage = new Map();
    this.factory = factory;
  }

  createOne(params) {
    const created = this.factory(crypto.randomUUID(), params);
    this.storage.set(created.id, created);
    return created;
  }

  getAll() {
    return this.storage;
  }

  getOne(id) {
    return this.storage.get(id);
  }

  // updateOne() {}

  deleteOne(id) {
    return this.storage.delete(id);
  }
}
