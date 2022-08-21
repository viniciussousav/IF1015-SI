import express from 'express'
import automakerRouter from './routes/automaker.routes';

const app = express();

app.use(express.json());

app.use('/automakers', automakerRouter);

app.listen(8080, () => console.log('Server running on port 8080'));