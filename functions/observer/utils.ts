import axios from 'axios';
import { logger } from './aws/logger';
import { region } from './config';
import { AWSIPS } from './types/awsIps';

const warningMessage = (suspectIp: string, instance: string): string => {
    return `Suspected external IP [ ${suspectIp} ] assuming role on EC2 instance [ ${instance} ].

    Check...
        - SSH Keys / Key Pair (rotate!)
        - Security Group / Network ACLs 
        - IAM Users / Groups / Roles / Credentials
        - Access to AWS Console
    
    https://${region}.console.aws.amazon.com/ec2/home?region=${region}#InstanceDetails:instanceId=${instance}
    
    `
};


async function getAwsIpAddresses(): Promise<string[]> {
    try {
        const response = await axios.get<AWSIPS>('https://ip-ranges.amazonaws.com/ip-ranges.json');
        return response.data.prefixes.map((prefix: { ip_prefix: string; }) => prefix.ip_prefix);
    } catch (error) {
        logger.info('Unable to get AWS IP addresses', { error });
        throw new Error('Unable to get AWS IP addresses');
    }
};

export { warningMessage, getAwsIpAddresses };
