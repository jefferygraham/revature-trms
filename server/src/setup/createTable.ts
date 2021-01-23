import * as AWS from 'aws-sdk';
import { nanoid, customAlphabet } from 'nanoid';

import userService from '../services/user';
import claimService from '../services/claim';

// Set the region
AWS.config.update({ region: 'us-east-1' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
  TableName: 'users',
};
const removeClaims = {
  TableName: 'claims',
};

const userSchema = {
  AttributeDefinitions: [
    {
      AttributeName: 'username',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'username',
      KeyType: 'HASH',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 3,
    WriteCapacityUnits: 3,
  },
  TableName: 'users',
  StreamSpecification: {
    StreamEnabled: false,
  },
};

const claimSchema = {
  AttributeDefinitions: [
    {
      AttributeName: 'claimId',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'claimId',
      KeyType: 'HASH',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 3,
    WriteCapacityUnits: 3,
  },
  TableName: 'claims',
  StreamSpecification: {
    StreamEnabled: false,
  },
};

ddb.deleteTable(removeUsers, function (err, data) {
  if (err) {
    console.error(
      'Unable to delete table. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      'Deleted table. Table description JSON:',
      JSON.stringify(data, null, 2)
    );
  }
  setTimeout(() => {
    ddb.createTable(userSchema, (err, data) => {
      if (err) {
        // log the error
        console.log('Error', err);
      } else {
        // celebrate, I guess
        console.log('Table Created', data);
        setTimeout(() => {
          populateUserTable();
        }, 10000);
      }
    });
  }, 5000);
});

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateClaimId = customAlphabet(alphabet, 7);
const generateUserId = customAlphabet(alphabet, 11);

const bencoId = generateUserId();
const salesDepartmentHeadId = generateUserId();
const engineeringDepartmentHeadId = generateUserId();
const salesSupervisor1Id = generateUserId();
const salesSupervisor2Id = generateUserId();
const engineeringSupervisor1Id = generateUserId();
const engineeringSupervisor2Id = generateUserId();
const salesAssociate1Id = generateUserId();
const salesAssociate2Id = generateUserId();
const salesAssociate3Id = generateUserId();
const salesAssociate4Id = generateUserId();
const engineeringAssociate1Id = generateUserId();
const engineeringAssociate2Id = generateUserId();
const engineeringAssociate3Id = generateUserId();
const engineeringAssociate4Id = generateUserId();

function populateUserTable() {
  userService
    .addUser({
      userId: bencoId,
      username: 'benco',
      password: 'pass',
      department: 'hr',
      supervisorId: generateUserId(),
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: true,
      isDepartmentHead: false,
      isBenco: true,
    })
    .then(() => {});
  userService
    .addUser({
      userId: salesDepartmentHeadId,
      username: 'salesDeptHead',
      password: 'pass',
      department: 'sales',
      supervisorId: generateUserId(),
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: true,
      isDepartmentHead: true,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: engineeringDepartmentHeadId,
      username: 'engineeringDeptHead',
      password: 'pass',
      department: 'engineering',
      supervisorId: generateUserId(),
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: true,
      isDepartmentHead: true,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: salesSupervisor1Id,
      username: 'salesSupervisor1',
      password: 'pass',
      department: 'sales',
      supervisorId: salesDepartmentHeadId,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: true,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: salesSupervisor2Id,
      username: 'salesSupervisor2',
      password: 'pass',
      department: 'sales',
      supervisorId: salesDepartmentHeadId,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: true,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: engineeringSupervisor1Id,
      username: 'engineeringSupervisor1',
      password: 'pass',
      department: 'engineering',
      supervisorId: engineeringDepartmentHeadId,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: true,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: engineeringSupervisor2Id,
      username: 'engineeringSupervisor2',
      password: 'pass',
      department: 'engineering',
      supervisorId: engineeringDepartmentHeadId,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: true,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: engineeringAssociate1Id,
      username: 'engineeringAssociate1',
      password: 'pass',
      department: 'engineering',
      supervisorId: engineeringSupervisor1Id,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: false,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: engineeringAssociate2Id,
      username: 'engineeringAssociate2',
      password: 'pass',
      department: 'engineering',
      supervisorId: engineeringSupervisor1Id,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: false,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: engineeringAssociate3Id,
      username: 'engineeringAssociate3',
      password: 'pass',
      department: 'engineering',
      supervisorId: engineeringSupervisor2Id,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: false,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: engineeringAssociate4Id,
      username: 'engineeringAssociate4',
      password: 'pass',
      department: 'engineering',
      supervisorId: engineeringSupervisor2Id,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: false,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: salesAssociate1Id,
      username: 'salesAssociate1',
      password: 'pass',
      department: 'sales',
      supervisorId: salesSupervisor1Id,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: false,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: salesAssociate2Id,
      username: 'salesAssociate2',
      password: 'pass',
      department: 'sales',
      supervisorId: salesSupervisor1Id,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: false,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: salesAssociate3Id,
      username: 'salesAssociate3',
      password: 'pass',
      department: 'sales',
      supervisorId: salesSupervisor2Id,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: false,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
  userService
    .addUser({
      userId: salesAssociate4Id,
      username: 'salesAssociate4',
      password: 'pass',
      department: 'sales',
      supervisorId: salesSupervisor2Id,
      annualReimbursement: 1000,
      pendingReimbursement: 0,
      awardedReimbursement: 0,
      isApprover: false,
      isDepartmentHead: false,
      isBenco: false,
    })
    .then(() => {});
}

ddb.deleteTable(removeClaims, function (err, data) {
  if (err) {
    console.error(
      'Unable to delete table. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      'Deleted table. Table description JSON:',
      JSON.stringify(data, null, 2)
    );
  }
  setTimeout(() => {
    ddb.createTable(claimSchema, (err, data) => {
      if (err) {
        // log the error
        console.log('Error', err);
      } else {
        // celebrate, I guess
        console.log('Table Created', data);
        setTimeout(() => {
          populateClaimsTable();
        }, 10000);
      }
    });
  }, 5000);
});

function populateClaimsTable() {
  claimService
    .addClaim({
      claimId: generateClaimId(),
      userId: salesAssociate1Id,
      supervisorId: salesSupervisor1Id,
      startDate: Date.now() + 1209600000,
      submissionDate: Date.now(),
      location: 'Atlanta',
      description: 'Description goes here',
      justification: 'Justification goes here',
      gradingFormat: 'pass/fail',
      comments: [],
      type: 'universityCourse',
      cost: 511,
      projectedReimbursement: 0,
      status: 'pending',
      needMoreInfo: false,
      needSupervisorApproval: true,
      needDepartmentHeadApproval: false,
      needBencoApproval: false,
    })
    .then(() => {});
  claimService
    .addClaim({
      claimId: generateClaimId(),
      userId: salesAssociate2Id,
      supervisorId: salesSupervisor1Id,
      startDate: Date.now() + 1209600000,
      submissionDate: Date.now(),
      location: 'DC',
      description: 'Description goes here',
      justification: 'Justification goes here',
      gradingFormat: 'pass/fail',
      comments: [],
      type: 'seminar',
      cost: 511,
      projectedReimbursement: 0,
      status: 'pending',
      needMoreInfo: false,

      needSupervisorApproval: false,
      needDepartmentHeadApproval: true,
      needBencoApproval: false,
    })
    .then(() => {});
  claimService
    .addClaim({
      claimId: generateClaimId(),
      userId: salesAssociate3Id,
      supervisorId: salesSupervisor2Id,
      startDate: Date.now() + 1209600000,
      submissionDate: Date.now(),
      location: 'Philadelphia',
      description: 'Description goes here',
      justification: 'Justification goes here',
      gradingFormat: 'pass/fail',
      comments: [],
      type: 'certPrep',
      cost: 511,
      projectedReimbursement: 0,
      status: 'pending',
      needMoreInfo: false,

      needSupervisorApproval: false,
      needDepartmentHeadApproval: false,
      needBencoApproval: true,
    })
    .then(() => {});
  claimService
    .addClaim({
      claimId: generateClaimId(),
      userId: salesAssociate4Id,
      supervisorId: salesSupervisor2Id,
      startDate: Date.now() + 1209600000,
      submissionDate: Date.now(),
      location: 'Online',
      description: 'Description goes here',
      justification: 'Justification goes here',
      gradingFormat: 'pass/fail',
      comments: [],
      type: 'certification',
      cost: 511,
      projectedReimbursement: 0,
      status: 'pending',
      needMoreInfo: false,

      needSupervisorApproval: true,
      needDepartmentHeadApproval: false,
      needBencoApproval: false,
    })
    .then(() => {});
  claimService
    .addClaim({
      claimId: generateClaimId(),
      userId: engineeringAssociate1Id,
      supervisorId: engineeringSupervisor1Id,
      startDate: Date.now() + 1209600000,
      submissionDate: Date.now(),
      location: 'Online',
      needMoreInfo: false,

      description: 'Description goes here',
      justification: 'Justification goes here',
      gradingFormat: 'pass/fail',
      comments: [],
      type: 'techTraining',
      cost: 511,
      projectedReimbursement: 0,
      status: 'pending',
      needSupervisorApproval: false,
      needDepartmentHeadApproval: true,
      needBencoApproval: false,
    })
    .then(() => {});
  claimService
    .addClaim({
      claimId: generateClaimId(),
      userId: engineeringAssociate2Id,
      supervisorId: engineeringSupervisor1Id,
      startDate: Date.now() + 1209600000,
      submissionDate: Date.now(),
      location: 'Online',
      description: 'Description goes here',
      justification: 'Justification goes here',
      gradingFormat: 'pass/fail',
      comments: [],
      type: 'universityCourse',
      cost: 511,
      needMoreInfo: false,

      projectedReimbursement: 0,
      status: 'pending',
      needSupervisorApproval: false,
      needDepartmentHeadApproval: false,
      needBencoApproval: true,
    })
    .then(() => {});
  claimService
    .addClaim({
      claimId: generateClaimId(),
      userId: engineeringAssociate3Id,
      supervisorId: engineeringSupervisor2Id,
      startDate: Date.now() + 1209600000,
      submissionDate: Date.now(),
      location: 'Online',
      description: 'Description goes here',
      justification: 'Justification goes here',
      gradingFormat: 'pass/fail',
      comments: [],
      type: 'seminar',
      cost: 511,
      projectedReimbursement: 0,
      needMoreInfo: false,

      status: 'pending',
      needSupervisorApproval: true,
      needDepartmentHeadApproval: false,
      needBencoApproval: false,
    })
    .then(() => {});
  claimService
    .addClaim({
      claimId: generateClaimId(),
      userId: engineeringAssociate4Id,
      supervisorId: engineeringSupervisor2Id,
      startDate: Date.now() + 1209600000,
      submissionDate: Date.now(),
      location: 'Online',
      description: 'Description goes here',
      justification: 'Justification goes here',
      gradingFormat: 'pass/fail',
      comments: [],
      type: 'certPrep',
      cost: 511,
      projectedReimbursement: 0,
      status: 'pending',
      needSupervisorApproval: false,
      needMoreInfo: false,

      needDepartmentHeadApproval: true,
      needBencoApproval: false,
    })
    .then(() => {});
}
