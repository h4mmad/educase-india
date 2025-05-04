// src/test-db.ts
import dotenv from 'dotenv';
dotenv.config();      // load .env first

import db from './db';

async function test() {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    console.log('MySQL connected, server time is', (rows as any)[0].now);
    process.exit(0);
  } catch (err) {
    console.error('MySQL connection failed:', err);
    process.exit(1);
  }
}
test();
