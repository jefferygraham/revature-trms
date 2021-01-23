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
  comments: { note: string; author: string; noteTime: any }[] = [];
  cost: number = 0;
  needMoreInfo: boolean = false;
  projectedReimbursement: number = 0;
  type: string = '';
  status: string = '';
  needSupervisorApproval: boolean = false;
  needDepartmentHeadApproval: boolean = false;
  needBencoApproval: boolean = false;
}
