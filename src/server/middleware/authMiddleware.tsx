import { Response, Request, NextFunction } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('isAuth');
  const isAuth = true;

  if (!isAuth) {
    res.status(401);
  }

  next();
};
