import { Router as expressRouter } from 'express';
import logger from '../logger/logger';

const router = expressRouter();

router.get('/responsibilities', (req, res) => {
  logger.info(req.ip);
  res.status(200).send('All is well...!');
});

router.get('/responsibilities/:id', (req, res) => {
  logger.info(req.ip);
  res.status(200).send('All is well...!');
});

router.put('/responsibilities/:id', (req, res) => {
  logger.info(req.body);
  res.status(200).send('All is well...!');
});

router.post('/responsibilities', (req, res) => {
  logger.info(req.body);
  res.status(200).send('All is well...!');
});
