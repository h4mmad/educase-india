import express, { Request, Response } from 'express';
import { validateBody, validateQuery } from './midlleware/validate';
import { addSchoolSchema,listSchoolsQuerySchema } from './schemas/school';
import { addSchoolHandler, listSchoolHandler } from './controllers/schoolController';

const app = express();
app.use(express.json())

app.get("/ping", (req: Request, res: Response)=>{
  res.status(201).json({"message": "pong"});
})

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
