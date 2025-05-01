import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";


// Generic validate function lets you write a function that works over any type
export function validateBody<T>(schema: ZodSchema<T>){
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(schema)
        if (!result.success){
            // do something here
            const errors = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
            return res.status(400).json({ errors });
        }

        req.body = result.data
        next()
    }
}