import { Router as expressRouter } from 'express';
import logger from '../logger/logger';

const router = expressRouter();

router.get('/practices', (req, res) => {
  logger.info(req.ip);
  res.status(200).send('All is well...!');
});

router.get('/practices/:id', (req, res) => {
  logger.info(req.ip);
  res.status(200).send('All is well...!');
});

router.put('/practices/:id', (req, res) => {
  logger.info(req.body);
  res.status(200).send('All is well...!');
});

router.post('/practices', (req, res) => {
  logger.info(req.body);
  res.status(200).send('All is well...!');
});
