const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'nideshop',
  prefix: 'nideshop_',
  encoding: 'utf8mb4',
  host: '47.96.189.4',
  port: '3306',
  user: 'root',
  password: 'pa!21word',
  dateStrings: true
};
