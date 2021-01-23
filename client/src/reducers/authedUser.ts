import { AuthedUserAction, AuthedUserActionTypes } from '../actions';
import { User } from '../models/user';

export const authedUserReducer = (
  userState: User = {
    username: '',
    password: '',
    userId: '',
    department: '',
    supervisorId: '',
    annualReimbursement: 1000,
    pendingReimbursement: 0,
    awardedReimbursement: 0,
    isApprover: false,
    isDepartmentHead: false,
    isBenco: false,
  },
  action: AuthedUserAction
) => {
  switch (action.type) {
    case AuthedUserActionTypes.getUser:
      return action.payload;
    case AuthedUserActionTypes.logoutUser:
      return {
        username: '',
        password: '',
        userId: '',
        department: '',
        supervisorId: '',
        annualReimbursement: 1000,
        pendingReimbursement: 0,
        awardedReimbursement: 0,
        isApprover: false,
        isDepartmentHead: false,
        isBenco: false,
      };
    default:
      return userState;
  }
};
