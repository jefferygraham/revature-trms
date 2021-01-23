import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from '../models/user';

class UserService {
  private doc: DocumentClient;
  constructor() {
    this.doc = dynamo;
  }

  async getUsers(): Promise<User[]> {
    const params = {
      TableName: 'users',
    };
    return await this.doc
      .scan(params)
      .promise()
      .then((data) => {
        logger.debug('USER GETUSERS SERVICE');
        return data.Items as User[];
      });
  }

  async getUserByName(username: string): Promise<User | null> {
    const params = {
      TableName: 'users',
      Key: {
        username: username,
      },
    };
    return await this.doc
      .get(params)
      .promise()
      .then((data) => {
        if (data && data.Item) {
          logger.debug(
            `USER SERVICE GETUSERBYNAME: data.Item: ${JSON.stringify(
              data.Item
            )}`
          );
          return data.Item as User;
        } else {
          return null;
        }
      });
  }

  async addUser(user: User): Promise<boolean> {
    const params = {
      TableName: 'users',
      Item: user,
      ConditionExpression: '#userId <> :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId',
      },
      ExpressionAttributeValues: {
        ':userId': user.userId,
      },
    };

    return await this.doc
      .put(params)
      .promise()
      .then((result) => {
        logger.info('USER ADDUSER SERVICE: Successfully created user');
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }

  async updateUser(user: User): Promise<boolean> {
    const params = {
      TableName: 'users',
      Item: user,
    };

    return await this.doc
      .put(params)
      .promise()
      .then(() => {
        logger.info('Successfully updated user');
        return true;
      })
      .catch((error) => {
        logger.error(error);
        return false;
      });
  }
}

const userService = new UserService();
export default userService;
