import { 
    SNSClient,
    PublishCommand,
    PublishCommandInput,
    PublishBatchCommandOutput
} from '@aws-sdk/client-sns';
import { region, snsTopic } from '../config';

const sns = new SNSClient({ region });

async function sendMessage(message: string): Promise<PublishBatchCommandOutput> {
    const input: PublishCommandInput = {
        TopicArn: snsTopic,
        Subject: 'Security Alert!',
        Message: message
    };
    return sns.send(new PublishCommand(input));
};

export { sendMessage };
