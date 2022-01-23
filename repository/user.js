/* eslint-disable indent*/

const User = require('../schemas/user');

class UserRepository {
  constructor() {
    this.model = User;
  }

  async findById(id) {
    const result = await this.model.findOne({
      _id: id,
    });
    return result;
  }

  async findByEmail(email) {
    const result = await this.model.findOne({
      email,
    });
    return result;
  }

  async create(body) {
    const user = new this.model(body);
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.findOneAndUpdate(
      {
        _id: id,
      },
      {token}
    );
  }
  async updateAvatar(id, avatar, idCloudAvatar) {
    await this.model.findOneAndUpdate(
      {
        _id: id,
      },
      {avatar, idCloudAvatar}
    );
  }

  async getAvatar(id) {
    const {avatar, idCloudAvatar} = await this.model.findOne({_id: id});
    return {avatar, idCloudAvatar};
  }
}

module.exports = UserRepository;
