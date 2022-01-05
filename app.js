const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const {HttpCode} = require('./helpers/constants');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `use api on route ${req.baseUrl}/api/contacts`,
    data: 'Not found',
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  err.code = err.code ? err.code : err.status;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.code,
    message: err.message,
    data: err.status === 500 ? 'Internal server error' : err.data,
  });
});

module.exports = app;
