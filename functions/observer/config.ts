export const region = process.env.AWS_REGION || '';
export const tableName = process.env.TABLE_NAME || '';
export const snsTopic = process.env.SNS_TOPIC || '';
export const whitelistIps: string[] = JSON.parse(process.env.WHITELIST_IPS || '[]');
