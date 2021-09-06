const {v4: uuid} = require('uuid');
const db = require('../db');

class ContactRepository {
  getAll() {
    return db.get('contacts').value();
  }
  getById(id) {
    return db.get('contacts').find({id}).value();
  }
  create(body) {
    const id = uuid();
    const record = {
      id,
      ...body,
    };
    db.get('contacts').push(record).write();
    return record;
  }
  remove(id) {
    const [record] = db.get('contacts').remove({id}).write();
    return record;
  }
  update(id, body) {
    const record = db.get('contacts').find({id}).assign(body).value();
    db.write();

    return record.id ? record : null;
  }
}

module.exports = ContactRepository;
