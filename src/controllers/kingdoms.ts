import { Router as expressRouter } from 'express';
import logger from '../logger/logger';

const router = expressRouter();

router.get('/kingdoms', (req, res) => {
  logger.info(req.ip);
  res.status(200).send('All is well...!');
});

router.get('/kingdoms/:id', (req, res) => {
  logger.info(req.ip);
  res.status(200).send('All is well...!');
});

router.put('/kingdoms/:id', (req, res) => {
  logger.info(req.body);
  res.status(200).send('All is well...!');
});

router.post('/kingdoms', (req, res) => {
  logger.info(req.body);
  res.status(200).send('All is well...!');
});
