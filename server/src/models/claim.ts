export class Claim {
  claimId: string = '';
  userId: string = '';
  supervisorId: string = '';
  startDate: number = 0;
  submissionDate: number = 0;
  location: string = '';
  description: string = '';
  justification: string = '';
  gradingFormat: string = '';
  comments: {}[] = [];
  cost: number = 0;
  projectedReimbursement: number = 0;
  type: string = '';
  status: string = '';
  needMoreInfo: boolean = false;
  needSupervisorApproval: boolean = false;
  needDepartmentHeadApproval: boolean = false;
  needBencoApproval: boolean = false;
  constructor() {}
}
