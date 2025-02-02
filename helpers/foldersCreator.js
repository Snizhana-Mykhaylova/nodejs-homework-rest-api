const fs = require('fs').promises;
/* eslint-disable indent*/
const isAccessible = async path => {
  return await fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFoldereIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = {
  createFoldereIsNotExist,
};
