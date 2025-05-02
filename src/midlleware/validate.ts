import { ZodSchema } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";


// Generic validate function lets you write a function that works over any type


export function validateBody<T>(schema: ZodSchema<T>): RequestHandler {
  return (
    req: Request<{}, {}, T>,
    res: Response,
    next: NextFunction
  ): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      res.status(400).json({ errors });
      return;
    }

    req.body = result.data;  // now strongly typed as T
    next();
  };
}
