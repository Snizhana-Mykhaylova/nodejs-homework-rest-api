const {UserRepository} = require('../repository');

class UsersService {
  constructor() {
    this.repositories = {
      users: new UserRepository(),
    };
  }

  async create(body) {
    const data = await this.repositories.users.create(body);
    return data;
  }

  async findByEmail(email) {
    const user = await this.repositories.users.findByEmail(email);
    return user;
  }

  async findByID(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }
}

module.exports = UsersService;
