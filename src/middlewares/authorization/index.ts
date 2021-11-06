import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '@models/User/User';
// import { decodeToken } from '@utils/generators/jwt/jwt';

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  try {
    if (
      req.headers.authorization === undefined
      || req.headers.authorization === null
    ) {
      return res.status(401).send({
        status_code: 401,
        results: {},
        errors: ['Authorization token is required'],
      });
    }

    const authorization = req.headers.authorization.split(' ');

    if (authorization.length !== 2 && authorization[0] !== 'Bearer') {
      return res.status(401).send({
        status_code: 401,
        results: {},
        errors: ['Authorization token is invalid'],
      });
    }

    jwt.verify(
      authorization[1],
      process.env.JWT_SECRET,
      async (error, decoded: { userId: string }) => {
        if (error) {
          return res.status(401).send({
            status_code: 401,
            results: {},
            errors: [error],
          });
        }

        const tokenizedUser = await User.findOne({
          where: { id: decoded.userId },
        });

        if (!tokenizedUser) {
          return res.status(401).send({
            status_code: 401,
            results: {},
            errors: ['Invalid user.'],
          });
        }

        next();
      },
    );
  } catch (err) {
    return res.status(401).send({
      status_code: 401,
      results: {},
      errors: [err],
    });
  }
}
