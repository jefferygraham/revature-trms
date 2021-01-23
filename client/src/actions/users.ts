import axios from 'axios';
import { Dispatch } from 'redux';

import { User } from '../models/user';
import { UserActionTypes } from './usersTypes';

export interface FetchUsersAction {
  type: UserActionTypes.fetchUsers;
  payload: User[];
}

export interface UpdateUserAction {
  type: UserActionTypes.updateUser;
  payload: User;
}

const uri = `${process.env.REACT_APP_SERVER_URI}/users`;

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<User[]>(uri);

    dispatch<FetchUsersAction>({
      type: UserActionTypes.fetchUsers,
      payload: response.data,
    });
  };
};

export const updateUser = (user: User) => {
  return async (dispatch: Dispatch) => {
    await axios.put<User>(`${uri}/${user.userId}`, user, {
      withCredentials: true,
    });

    dispatch<UpdateUserAction>({
      type: UserActionTypes.updateUser,
      payload: user,
    });
  };
};
