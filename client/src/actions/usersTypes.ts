import { FetchUsersAction, UpdateUserAction } from './users';

export enum UserActionTypes {
  fetchUsers = 'FETCH_USERS',
  updateUser = 'UPDATE_USER',
}

export type UsersAction = FetchUsersAction | UpdateUserAction;
