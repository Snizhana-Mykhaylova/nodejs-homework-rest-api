const {ContactRepository} = require('../repository');


class ContactService {
  constructor() {
    this.repositories = {
      contacts: new ContactRepository(),
    };
  }

  getAll() {
    const data = this.repositories.contacts.getAll();
    return data;
  }

  getById(id) {
    const data = this.repositories.contacts.getById(id);
    return data;
  }

  create(body) {
    const data = this.repositories.contacts.create(body);
    return data;
  }

  remove({contactId}) {
    const data = this.repositories.contacts.remove(contactId);
    return data;
  }

  update({contactId}, body) {
    const data = this.repositories.contacts.update(contactId, body);
    return data;
  }
}

module.exports = ContactService;
