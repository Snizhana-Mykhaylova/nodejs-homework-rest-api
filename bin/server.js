const app = require('../app');
const path = require('path');
const db = require('../db');
const {createFoldereIsNotExist} = require('../helpers/foldersCreator');

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const PORT = process.env.PORT || 3000;
db.then(() => {
  app.listen(PORT, async () => {
    await createFoldereIsNotExist(UPLOAD_DIR);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
});
