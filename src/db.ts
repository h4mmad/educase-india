import dotenv from 'dotenv';
dotenv.config();      
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host:            "mysql-db-zpkp",
  port:            Number(process.env.DB_PORT || 3306),
  user:            process.env.DB_USER!,
  password:        process.env.DB_PASSWORD!,
  database:        process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit:      0,
});

export default db;
