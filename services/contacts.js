const {ContactRepository} = require('../repository');

class ContactService {
  constructor() {
    this.repositories = {
      contacts: new ContactRepository(),
    };
  }

  async getAll() {
    const data = await this.repositories.contacts.getAll();
    return data;
  }

  async getById(id) {
    const data = await this.repositories.contacts.getById(id);
    return data;
  }

  async create(body) {
    const data = await this.repositories.contacts.create(body);
    return data;
  }

  async remove({contactId}) {
    const data = await this.repositories.contacts.remove(contactId);
    return data;
  }

  async update({contactId}, body) {
    const data = await this.repositories.contacts.update(contactId, body);
    return data;
  }
  async updateStatus({contactId}, body) {
    const data = await this.repositories.contacts.update(contactId, body);
    return data;
  }
}

module.exports = ContactService;
