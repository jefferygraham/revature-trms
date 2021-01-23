import { GetUserAction, LogoutUserAction } from './authedUser';

export enum AuthedUserActionTypes {
  getUser = 'GET_USER',
  logoutUser = 'LOGOUT_USER',
}

export type AuthedUserAction = GetUserAction | LogoutUserAction;
