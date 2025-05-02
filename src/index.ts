import express, {NextFunction, Request, Response} from 'express';
import { validateBody } from './midlleware/validate';
import { addSchoolSchema } from './schemas/school';

const app = express();
app.use(express.json())


app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("HII");  
})


app.post(
  '/addSchool',
  validateBody(addSchoolSchema),
  (req: Request, res: Response) => {
    // ...do your DB insert...
    console.log(req.body)
    res.status(201).json({id: ""});
    // no `return res.json(...)`
  }
);

app.get("/listSchools", (req: Request, res: Response) => {


})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
 console.log(`Server running on ${PORT}`)
})
