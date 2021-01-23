import axios from 'axios';
import { Dispatch } from 'redux';

import { User } from '../models/user';
import { AuthedUserActionTypes } from './authedUserTypes';

export interface GetUserAction {
  type: AuthedUserActionTypes.getUser;
  payload: User;
}

export interface LogoutUserAction {
  type: AuthedUserActionTypes.logoutUser;
  payload: User;
}

const uri = `${process.env.REACT_APP_SERVER_URI}/users`;

export const getUser = (user: User) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.post<User>(`${uri}/login`, user, {
      withCredentials: true,
    });

    dispatch<GetUserAction>({
      type: AuthedUserActionTypes.getUser,
      payload: response.data,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<User>(`${uri}/logout`, {
      withCredentials: true,
    });

    dispatch<LogoutUserAction>({
      type: AuthedUserActionTypes.logoutUser,
      payload: response.data,
    });
  };
};
