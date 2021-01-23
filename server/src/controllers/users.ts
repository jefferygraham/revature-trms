import { Response, Request, NextFunction } from 'express';
import logger from '../log';
import * as user from '../models/user';
import publicDir from '../constant';
import userService from '../services/user';

declare module 'express-session' {
  interface Session {
    user: user.User;
  }
}

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(`USER GETUSERS CONTROLLER`);
  user.getUsers().then((data) => {
    if (data.length > 0) {
      res.send(JSON.stringify(data));
    } else {
      res.sendStatus(401);
    }
  });
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    res.send('Logged out!');
  });
};

const register = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(`USER REGISTER CONTROLLER: ${JSON.stringify(req.body)}`);
  user.register(req.body.username, req.body.password).then((data) => {
    if (data) {
      res.sendStatus(201);
      return true;
    } else {
      res.sendStatus(401);
      return false;
    }
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(`USER LOGIN CONTROLLER: ${JSON.stringify(req.body)}`);
  user.login(req.body.username, req.body.password).then((user) => {
    if (user === null) {
      logger.warn('USER LOGIN CONTROLLER: Unauthorized login attempt');
      res.sendStatus(401);
    } else {
      req.session.user = user;
      res.send(JSON.stringify(user));
    }
  });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(req.body);
  userService
    .updateUser(req.body)
    .then((data) => {
      logger.debug(data);
      res.sendStatus(201); // Created
    })
    .catch((err) => {
      logger.error(err);
      res.sendStatus(500); // Server error, sorry
    });
};

export { getUsers, logout, login, register, updateUser };
