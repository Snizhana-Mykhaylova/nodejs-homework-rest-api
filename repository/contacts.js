/* eslint-disable indent*/

const Contact = require('../schemas/contacts');

class ContactRepository {
  constructor() {
    this.model = Contact;
  }

  async getAll(userId, {page = 1, limit = 5, sortBy, sortByDesc, filter}) {
    const result = await this.model.paginate(
      {owner: userId},
      {
        page,
        limit,
        sort: {
          ...(sortBy ? {[`$sortBy`]: 1} : {}),
          ...(sortByDesc ? {[`$sortByDesc`]: -1} : {}),
        },
        select: filter ? filter.split('|').join(' ') : '',
        populate: {
          path: 'owner',
          select: 'email subscription',
        },
      }
    );
    return result;
  }
  async getById(userId, id) {
    const result = await this.model
      .findOne({
        _id: id,
        owner: userId,
      })
      .populate({
        path: 'owner',
        select: 'email subscription',
      });

    return result;
  }

  async create(userId, body) {
    const result = await this.model.create({...body, owner: userId});
    return result;
  }

  async remove(userId, id) {
    const result = await this.model.findByIdAndRemove({
      _id: id,
      owner: userId,
    });
    return result;
  }

  async update(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      {_id: id, owner: userId},
      body,
      {
        new: true,
      }
    );
    return result;
  }
}

module.exports = ContactRepository;
