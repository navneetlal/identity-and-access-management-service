import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from './logger/logger';
import sequelize from './dbContext/postgres';

const PORT = process.env.PORT || 3000;

sequelize.sync({
  force: true,
  schema: 'public',
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '5mb' }));

app.get('/', (req, res) => {
  logger.info('Request Ip: ', req.ip);
  res.status(200).send('All is well..!');
});

app.listen(PORT, () => {
  logger.info(`App listening at http://localhost:${PORT}`);
});
