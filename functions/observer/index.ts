import { Context, EventBridgeEvent } from 'aws-lambda';
import { logger } from './aws/logger';
import { CloudtrailEventDetail, StsUserIdentity, Ec2RequestParameters, StsRequestParameters } from './types/event';
import { queryItem, putItem, deleteItem } from './aws/dynamo';
import { sendMessage } from './aws/sns';
import { warningMessage, getAwsIpAddresses } from './utils';
import { whitelistIps } from './config';

async function handler(event: EventBridgeEvent<string, CloudtrailEventDetail>, context: Context): Promise<void> {
    logger.addContext(context);
    logger.debug('event', { event });
    const { eventName, eventSource, sourceIPAddress, requestParameters, userIdentity } = event.detail;

    if (eventName.toLowerCase() == 'assumerole' && sourceIPAddress == 'ec2.amazonaws.com') {
        logger.info('assumerole / ec2.amazonaws.com', { event });
        const pk = (requestParameters as StsRequestParameters).roleSessionName;
        const queryResponse = await queryItem(pk);

        if (queryResponse.Items && queryResponse.Items?.length > 0) {
            const item = queryResponse.Items[0];
            logger.info(`Item Exists - instance ${item.pk.S} from source ${item.sk.S}!`);
        } else {
            await putItem({
                pk: { S: pk },
                sk: { S: sourceIPAddress },
                arn: { S: (requestParameters as StsRequestParameters).roleArn },
            });
            logger.info(`Saved Item - instance ${pk} from source ${sourceIPAddress}!`);
        };
    };

    if (userIdentity.type.toLowerCase() == 'assumedrole') {
        logger.info('assumedrole', { event });
        const length = (userIdentity as StsUserIdentity).arn.split('/').length;
        const pk = (userIdentity as StsUserIdentity).arn.split('/')[length - 1];
        const queryResponse = await queryItem(pk);

        if (queryResponse.Items && queryResponse.Items?.length > 0) {
            const item = queryResponse.Items[0];
            const awsIps = await getAwsIpAddresses();
            
            if (item.sk.S !== sourceIPAddress || !whitelistIps.includes(sourceIPAddress) || !awsIps.includes(sourceIPAddress)) {
                logger.info(`Suspicious activity - instance ${pk} from source ${sourceIPAddress}!`);

                const message = warningMessage(sourceIPAddress, pk);
                await sendMessage(message);
                throw new Error('ip does not match entry saved');
            }
        };
    };

    if (eventName.toLowerCase() == 'terminateinstances') {
        logger.info('terminateinstances', { event });
        const items = (requestParameters as Ec2RequestParameters).instancesSet.items;

        for (const item of items) {
            await deleteItem(item.instanceId, eventSource);
            logger.info(`Deleted item - instance ${item.instanceId} from source ${eventSource}!`);
        }
    };

    return;
};

export { handler };
