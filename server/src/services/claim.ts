import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Claim } from '../models/claim';

class ClaimService {
  private doc: DocumentClient;
  constructor() {
    this.doc = dynamo;
  }

  async getClaims(): Promise<Claim[]> {
    const params = {
      TableName: 'claims',
    };
    return await this.doc
      .scan(params)
      .promise()
      .then((data) => {
        return data.Items as Claim[];
      })
      .catch((err) => {
        logger.error(err);
        return [];
      });
  }

  async getClaim(claimId: string): Promise<Claim | null> {
    const params = {
      TableName: 'claims',
      Key: {
        name: claimId,
      },
    };
    return await this.doc
      .get(params)
      .promise()
      .then((data) => {
        return data.Item as Claim;
      })
      .catch((err) => {
        logger.error(err);
        return null;
      });
  }

  async addClaim(claim: Claim): Promise<boolean> {
    const params = {
      TableName: 'claims',
      Item: claim,
    };

    return await this.doc
      .put(params)
      .promise()
      .then((result) => {
        logger.info('Successfully created claim');
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }

  async updateClaim(claim: Claim): Promise<boolean> {
    const params = {
      TableName: 'claims',
      Item: claim,
    };

    return await this.doc
      .put(params)
      .promise()
      .then(() => {
        logger.info('Successfully updated claim');
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }

  async deleteClaim(id: string): Promise<Boolean> {
    const params = {
      TableName: 'claims',
      Key: {
        name: id,
      },
    };
    return await this.doc
      .delete(params)
      .promise()
      .then((data) => {
        return true;
      })
      .catch((err) => {
        logger.error(err);
        return false;
      });
  }
}

const claimService = new ClaimService();
export default claimService;
