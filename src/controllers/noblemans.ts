import { Router as expressRouter } from 'express';
import logger from '../logger/logger';

const router = expressRouter();

router.get('/nobleman', (req, res) => {
  logger.info(req.ip);
  res.status(200).send('All is well...!');
});

router.get('/nobleman/:id', (req, res) => {
  logger.info(req.ip);
  res.status(200).send('All is well...!');
});

router.put('/nobleman/:id', (req, res) => {
  logger.info(req.body);
  res.status(200).send('All is well...!');
});

router.post('/nobleman', (req, res) => {
  logger.info(req.body);
  res.status(200).send('All is well...!');
});
