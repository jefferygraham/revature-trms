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
  isDepartmentHead?: boolean = false;
  isBenco: boolean = false;
}
