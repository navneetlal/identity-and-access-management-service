import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'iam',
  password: process.env.DB_PASS || 'example',
  database: process.env.DB_NAME || 'iam-service',
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
  dialect: 'postgres',
});

export default sequelize;
