const {UserRepository} = require('../repository');
const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
require('dotenv').config();
const {ErrorHandler} = require('../helpers/errorHandler');
class UsersService {
  constructor() {
    this.cloudinary = cloudinary;
    this.cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });
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

  async updateAvatar(id, path) {
    try {
      const {
        secure_url: avatar,
        public_id: idCloudAvatar,
      } = await this.#uploadCloud(path);
      const oldAvatar = await this.repositories.users.getAvatar(id);
      this.cloudinary.uploader.destroy(oldAvatar.idCloudAvatar, (err, res) => {
        console.log(err, res);
      });
      await this.repositories.users.updateAvatar(id, avatar, idCloudAvatar);
      await fs.unlink(path);
      return avatar;
    } catch (err) {
      throw new ErrorHandler(null, 'Error upload avatar');
    }
  }

  #uploadCloud = pathFile => {
    return new Promise((res, rej) => {
      cloudinary.uploader.upload(
        pathFile,
        {folder: 'Avatars', transformation: {width: 250, crop: 'fill'}},
        (error, result) => {
          if (error) rej(error);
          if (result) res(result);
        }
      );
    });
  };
}

module.exports = UsersService;
