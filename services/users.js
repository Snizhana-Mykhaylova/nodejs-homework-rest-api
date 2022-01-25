const {UserRepository} = require('../repository');
const EmailService = require('./email');
const {ErrorHandler} = require('../helpers/errorHandler');
const {nanoid} = require('nanoid');
const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
require('dotenv').config();

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
    this.emailService = new EmailService();
  }

  async create(body) {
    const verifyToken = nanoid();
    const {email} = body;
    const name = 'User';

    try {
      await this.emailService.sendEmail(verifyToken, email, name);
    } catch (e) {
      throw new ErrorHandler(503, e.message, 'service Unavailable');
    }
    const data = await this.repositories.users.create({...body, verifyToken});
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

  async verify({verificationToken}) {
    const user = await this.repositories.users.findByToken({
      verifyToken: verificationToken,
    });
    if (!user) {
      return false;
    }
    await user.updateOne({verify: true, verifyToken: null});
    return true;
  }

  async reVerify(email) {
    const user = await this.repositories.users.findByEmail(email);

    if (user & !user.verify) {
      try {
        await this.emailService.sendEmail(user.verifyToken, email, name);
        return true;
      } catch (e) {
        throw new ErrorHandler(503, e.message, 'service Unavailable');
      }
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
