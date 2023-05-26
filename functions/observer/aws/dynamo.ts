import { 
    DynamoDBClient, 
    QueryCommand, 
    QueryCommandInput, 
    QueryCommandOutput, 
    PutItemCommand, 
    PutItemCommandInput,
    PutItemCommandOutput,
    DeleteItemCommand,
    DeleteItemCommandInput,
    DeleteItemCommandOutput,
    AttributeValue,
} from '@aws-sdk/client-dynamodb';
import { region, tableName } from '../config';

const dynamodb = new DynamoDBClient({ region });

async function queryItem(pk: string): Promise<QueryCommandOutput> {
    const input: QueryCommandInput = {
        TableName: tableName,
        KeyConditionExpression: '#pk = :pk',
        ExpressionAttributeNames:{
            '#pk': 'pk'
        },
        ExpressionAttributeValues: {
            ':pk': {
                S: pk
            }
        }
    };
    return await dynamodb.send(new QueryCommand(input));
};

async function putItem(item: Record<string, AttributeValue>): Promise<PutItemCommandOutput> {
    const input: PutItemCommandInput = {
        TableName: tableName,
        Item: item
    };
    return await dynamodb.send(new PutItemCommand(input));
};

async function deleteItem(pk: string, sk: string): Promise<DeleteItemCommandOutput> {
    const input: DeleteItemCommandInput = {
        TableName: tableName,
        Key: {
            pk: {
                S: pk
            },
            sk: {
                S: sk
            }
        }
    };
    return await dynamodb.send(new DeleteItemCommand(input));
};

export { queryItem, putItem, deleteItem };
