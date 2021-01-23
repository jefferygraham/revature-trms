import { UsersAction, UserActionTypes } from '../actions/usersTypes';
import { User } from '../models/user';

export const usersReducer = (state: User[] = [], action: UsersAction) => {
  switch (action.type) {
    case UserActionTypes.fetchUsers:
      return action.payload;
    case UserActionTypes.updateUser:
      const idx = state.findIndex(
        (user: User) => user.userId === action.payload.userId
      );
      return [...state.slice(0, idx), action.payload, ...state.slice(idx + 1)];
    default:
      return state;
  }
};
