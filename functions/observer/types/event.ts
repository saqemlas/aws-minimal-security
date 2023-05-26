export interface CloudtrailEventDetail {
    awsRegion: string;
    eventCategory: string;
    eventID: string;
    eventName: string;
    eventSource: string;
    eventTime: string;
    eventType: string;
    eventVersion: string;
    managementEvent: boolean;
    readOnly: boolean;
    recipientAccountId: string;
    requestID: string;
    requestParameters?: Ec2RequestParameters | StsRequestParameters;
    responseElements?: ResponseElements;
    sourceIPAddress: string;
    userAgent: string;
    userIdentity: StsUserIdentity | Ec2UserIdentity;
}

export interface StsRequestParameters {
    roleArn: string;
    roleSessionName: string;
}

export interface Ec2RequestParameters {
    instancesSet: InstanceConnection
}

interface InstanceConnection {
    items: Instance[];
}

interface Instance {
    instanceId: string;
}

interface ResponseElements {
    credentials?: Credentials;
    assumedRoleUser?: AssumedRoleUser;
}

interface Credentials {
    accessKeyId: string;
    sessionToken: string;
    expiration: string;
}

interface AssumedRoleUser {
    assumedRoleId: string;
    arn: string;
}

export interface StsUserIdentity {
    type: string;
    accountId: string;
    arn: string;
    invokedBy: string;
    principalId: string;
    sessionContext: {
        attributes: {
            creationDate: string;
            mfaAuthenticated: string;
        },
        sessionIssuer: {
            accountId: string;
            arn: string;
            principalId: string;
            type: string;
            userName: string;
        },
        webIdFederationData: any;
    }
}

export interface Ec2UserIdentity {
    type: string;
    invokedBy: string;
}
