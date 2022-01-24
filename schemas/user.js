/* eslint-disable indent*/
const gravatar = require('gravatar');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 10;
const {Schema} = mongoose;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {s: '250'}, true);
      },
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  {versionKey: false}
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('users', userSchema);

module.exports = User;
