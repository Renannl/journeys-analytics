import express from 'express';
import journeysRouter from './routes/journeys';

const app = express();
app.use(express.json());

app.use('/journeys', journeysRouter);

app.get('/', (_req, res) => res.send({ ok: true }));

export default app;