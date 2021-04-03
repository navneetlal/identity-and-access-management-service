import { configure, getLogger } from 'log4js';
import log4jsConfig from './config.json';

configure(log4jsConfig);

export default getLogger();
