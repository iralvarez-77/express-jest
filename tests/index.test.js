import app from '../src/routes/index.js';
import request from 'supertest';

describe('GET /task', () => {

  test('should respond with 200 status code', async () => {
    const response = await request(app).get('/task').send();
    expect(response.status).toBe(200);
  })

  test ('this is iqual to array', async () => {
    const resp = await  request(app).get('/task').send();

    expect(resp.body).toBeInstanceOf(Array);
  })
});

describe('POST /task', () => {
  const task = {
    title: 'tarea 1',
    desc: 'Esto es mi primer tarea'
  };

  test('should responded with 200 status code', async () => {
    const response = await request(app).post('/task').send(task);
    expect(response.status).toBe(200);
  });

  test('should send a content-type/json', async () => {
    const response = await request(app).post('/task').send(task);

    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'))
  });

  test ('should haven a defined Id property', async () => {
    const res = await request(app).post('/task').send(task);

    expect(res.body.id).toBeDefined();
  });

  describe('title and desc are missing', ()=> {

    test ('should respond with 400 status code', async  () => {
      const fields = [
        {},
        {desc: ''},
        {title: ''}
        ];


      for ( let field of fields) {
        const response = await request(app).post('/task').send(field);
        expect(response.status).toBe(400);
      }
    })
  })
});
