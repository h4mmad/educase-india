import { ZodSchema } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";


// Express middle ware functions expect the form
// (req: Request, res: Response, next: NextFunction) => void


// Generic validate function lets you write a function that works over any type


export function validateBody<T>(schema: ZodSchema<T>): RequestHandler<{}, {}, T> {
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

    req.body = result.data; 
    next();
  };
}

export function validateQuery<T extends object>(
  schema: ZodSchema<T>
): RequestHandler<unknown, any, any, T> {
  return (
    req: Request<unknown, any, any, T>,
    res: Response,
    next: NextFunction
  ): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      const errors = result.error.errors.map(
        e => `${e.path.join('.')}: ${e.message}`
      );
      res.status(400).json({ errors });
      return;
    }

    Object.assign(req.query, result.data);
    next();
  };
}
