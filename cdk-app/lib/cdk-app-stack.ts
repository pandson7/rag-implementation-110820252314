import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kendra from 'aws-cdk-lib/aws-kendra';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class RagImplementationStack110820252314 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = '110820252314';

    // S3 bucket for documents
    const documentsBucket = new s3.Bucket(this, `DocumentsBucket${suffix}`, {
      bucketName: `rag-documents-${suffix}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT, s3.HttpMethods.POST],
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
      }]
    });

    // IAM role for Kendra
    const kendraRole = new iam.Role(this, `KendraRole${suffix}`, {
      assumedBy: new iam.ServicePrincipal('kendra.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess')
      ]
    });

    // Grant Kendra access to S3 bucket
    documentsBucket.grantRead(kendraRole);

    // Kendra index
    const kendraIndex = new kendra.CfnIndex(this, `KendraIndex${suffix}`, {
      name: `rag-index-${suffix}`,
      edition: 'DEVELOPER_EDITION',
      roleArn: kendraRole.roleArn,
      description: 'RAG implementation document index'
    });

    // DynamoDB table for query history
    const queryHistoryTable = new dynamodb.Table(this, `QueryHistoryTable${suffix}`, {
      tableName: `rag-query-history-${suffix}`,
      partitionKey: { name: 'query_id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // Enable auto scaling
    queryHistoryTable.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 10
    });

    queryHistoryTable.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 10
    });

    // Outputs
    new cdk.CfnOutput(this, 'DocumentsBucketName', {
      value: documentsBucket.bucketName,
      description: 'S3 bucket for documents'
    });

    new cdk.CfnOutput(this, 'KendraIndexId', {
      value: kendraIndex.attrId,
      description: 'Kendra index ID'
    });

    new cdk.CfnOutput(this, 'QueryHistoryTableName', {
      value: queryHistoryTable.tableName,
      description: 'DynamoDB table for query history'
    });
  }
}
