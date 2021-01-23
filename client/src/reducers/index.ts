import { combineReducers } from 'redux';

import { User } from '../models/user';
import { authedUserReducer } from './authedUser';
import { Claim } from '../models/claim';
import { claimsReducer } from './claims';
import { usersReducer } from './users';

export interface StoreState {
  authedUser: User;
  claims: Claim[];
  users: User[];
}

export const reducers = combineReducers<StoreState>({
  authedUser: authedUserReducer,
  claims: claimsReducer,
  users: usersReducer,
});
