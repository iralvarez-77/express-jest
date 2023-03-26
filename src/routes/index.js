import express from 'express';
import { v4 as uuidv4 } from 'uuid'

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('hola mundo');
});

app.get('/task', (req, res) => {
  res.json([]);
});

app.post('/task', (req, res) => {

  const { title, desc } = req.body;

  if (!title || !desc) return res.status(400).send('Falló');

  res.status(200).json({
    title,
    desc,
    id: uuidv4()
  });
});

export default app;