import { Router as expressRouter } from 'express';
import logger from '../logger/logger';

const router = expressRouter();

router.get('/clans', (req, res) => {
  logger.info(req.ip);
  res.status(200).send('All is well...!');
});

router.get('/clans/:id', (req, res) => {
  logger.info(req.ip);
  res.status(200).send('All is well...!');
});

router.put('/clans/:id', (req, res) => {
  logger.info(req.body);
  res.status(200).send('All is well...!');
});

router.post('/clans', (req, res) => {
  logger.info(req.body);
  res.status(200).send('All is well...!');
});
