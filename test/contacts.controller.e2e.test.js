/* eslint-disable indent*/
const request = require('supertest');
const app = require('../app');
const {
  contacts: fakeData,
  //   newContact,
} = require('../services/__mocks__/data-contacts');

jest.mock('../services');
jest.mock('../helpers/guard', () => {
  return (req, res, next) => {
    req.user = {id: 1};
    next();
  };
});

describe('should handle get request app/contacts', () => {
  test('should return status 200 for get all contacts', async done => {
    const res = await request(app)
      .get('/api/contacts')
      .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.data.contacts).toBeInstanceOf(Array);
    done();
  });

  test('should return status 200 for get contact by id', async done => {
    const contact = fakeData[0];
    const res = await request(app)
      .get(`/api/contacts/${contact._id}`)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.data.contact._id).toBe(contact._id);
    done();
  });

  test.skip('should return status 404 for get contact by wrong id', async done => {
    const contact = {_id: 1};
    const res = await request(app)
      .get(`/api/contacts/${contact._id}`)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(404);
    expect(res.body).toBeDefined();
    done();
  });
});
