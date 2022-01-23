/* eslint-disable indent*/
const {ContactRepository} = require('../repository');

class ContactService {
  constructor() {
    this.repositories = {
      contacts: new ContactRepository(),
    };
  }

  async getAll(userId, query) {
    const data = await this.repositories.contacts.getAll(userId, query);
    const {docs: contacts, totalDocs: total, limit, page} = data;
    return {
      contacts,
      total,
      limit,
      page,
    };
  }

  async getById(userId, {contactId}) {
    const data = await this.repositories.contacts.getById(userId, contactId);
    return data;
  }

  async create(userId, body) {
    const data = await this.repositories.contacts.create(userId, body);
    return data;
  }

  async remove(userId, {contactId}) {
    const data = await this.repositories.contacts.remove(userId, contactId);
    return data;
  }

  async update(userId, {contactId}, body) {
    const data = await this.repositories.contacts.update(
      userId,
      contactId,
      body
    );
    return data;
  }
  async updateStatus(userId, {contactId}, body) {
    const data = await this.repositories.contacts.update(
      userId,
      contactId,
      body
    );
    return data;
  }
}

module.exports = ContactService;
