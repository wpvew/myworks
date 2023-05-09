const { Sequelize } = require('sequelize');
require('dotenv').config();

const IS_PROD = process.env.NODE_ENV === 'production';

const configSSL = {
  require: true,
  rejectUnauthorized: false,
};

const config = {
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  dialect: 'postgres',
  dialectOptions: {
    ssl: IS_PROD ? configSSL : false,
  },
};

const sequelize = IS_PROD ? new Sequelize(process.env.DATABASE_URL, config) : new Sequelize(config);

module.exports = sequelize;
