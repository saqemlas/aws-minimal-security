# AWS Account Security

## Info 

This stack sets up a basic proactive monitoring and alerting environment on common suspicious activities in your AWS Account. It deploys...
- Cloudtrail trail for API logging.
- SNS topic for notifications and SNS policy for Events and Lambda.
- Event rules & alerts for...
    - Signing into Root
    - Stopping, Deleting, or Updating Cloudtrails
    - IAM User changes
    - MFA changes
    - Exfiltration on EBS Snapshot or AMI (sharing)
    - Use of STS get-caller-identity
- Cloudwatch Alarms on..
    - Unauthorized API Call
    - Failed Console Logins
    - Running IMDSv1 EC2 Instances
- Cloudwatch Dashboard for Cloudwatch Log Metric Filters on Cloudtrail Log Group
- S3 bucket and bucket policy for Cloudtrail data storage
- Cloudwatch Logs for Cloudtrail and Lambda logging
- Lambda function triggered by sts and ec2 API calls
- DynamoDB to store EC2 instance, IAM role, and IP information

### References

- [White Paper by Netflix's Will Bengtson](docs/White-Paper-Detecting-Credential-Compromise-In-AWS.pdf)
- [Server Side Request Forgery on EC2 IMDSv1 vs IMDSv2](https://blog.appsecco.com/server-side-request-forgery-ssrf-and-aws-ec2-instances-after-instance-meta-data-service-version-38fc1ba1a28a)
- [AWS Guideline on Basic Account Security Practices](https://aws.amazon.com/blogs/security/getting-started-follow-security-best-practices-as-you-configure-your-aws-resources/)
- [Corey Quinn's - AWS Security Survival Kit](https://github.com/zoph-io/aws-security-survival-kit)
- [Will Bengtson's - Detecting Credential Compromise in AWS](https://github.com/Netflix-Skunkworks/aws-credential-compromise-detection/tree/master)


## Usage 


## Setup

- Update `email` and `whitelistIps` in the serverless.yml custom section.

### Credentials:
```bash
export AWS_PROFILE=<profile_name>
```

### Install Dependencies:

```bash
yarn run install
```

### Deploy:

```bash
yarn run deploy
```

### Remove:

```bash
yarn run remove
```
