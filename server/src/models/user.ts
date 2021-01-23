import { nanoid } from 'nanoid';

import logger from '../log';
import userService from '../services/user';

export class User {
  userId: string = '';
  username: string = '';
  password: string = '';
  department: string = '';
  supervisorId: string = '';
  annualReimbursement: number = 1000;
  pendingReimbursement: number = 0;
  awardedReimbursement: number = 0;
  isApprover: boolean = false;
  isDepartmentHead: boolean = false;
  isBenco: boolean = false;
  constructor() {}
}

export async function getUsers(): Promise<User[]> {
  logger.debug(`USER GETUSERS MODEL`);
  return await userService.getUsers().then((users) => {
    if (users) {
      return users;
    } else {
      return [];
    }
  });
}

export async function login(
  username: string,
  password: string
): Promise<User | null> {
  logger.debug(`USER LOGIN MODEL: ${username + ' ' + password}`);
  return await userService.getUserByName(username).then((user) => {
    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  });
}

export async function register(
  username: string,
  password: string
): Promise<boolean> {
  return await userService
    .addUser(new User())
    .then((res) => {
      logger.trace(`USER REGISTER MODEL?: ${res}`);
      return true;
    })
    .catch((err) => {
      logger.error(err);
      console.log(
        'Error, this probably means that the username is already taken.'
      );
      return false;
    });
}

// export function updateUser(user: User) {
//   userService
//     .updateUser(user)
//     .then((success) => {
//       logger.info('user updated successfully');
//     })
//     .catch((error) => {
//       logger.warn('user not updated');
//     });
// }
