import express from 'express';
import { validateBody, validateQuery } from './midlleware/validate';
import { addSchoolSchema,listSchoolsQuerySchema } from './schemas/school';
import { addSchoolHandler, listSchoolHandler } from './controllers/schoolController';
import db from './db';

async function bootstrap(){
  await db.execute(`
    CREATE TABLE IF NOT EXISTS schools (
      id        CHAR(36)     NOT NULL PRIMARY KEY,
      name      VARCHAR(255) NOT NULL,
      address   VARCHAR(255) NOT NULL,
      latitude  FLOAT        NOT NULL,
      longitude FLOAT        NOT NULL
    );
  `);


const app = express();
app.use(express.json())

app.post(
  '/addSchool',
  validateBody(addSchoolSchema),
  addSchoolHandler
);


app.get("/listSchools",
   validateQuery(listSchoolsQuerySchema),
    listSchoolHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
 console.log(`Server running on ${PORT}`)
})


}
bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});

