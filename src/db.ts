import dotenv from 'dotenv';
dotenv.config();      
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host:            process.env.DB_HOST!,
  port:            Number(process.env.DB_PORT || 3306),
  user:            process.env.MYSQL_USER!,
  password:        process.env.MYSQL_PASSWORD!,
  database:        process.env.MYSQL_DATABASE!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit:      0,
});

export default db;
