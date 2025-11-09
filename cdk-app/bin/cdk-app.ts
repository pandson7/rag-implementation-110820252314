#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { RagImplementationStack110820252314 } from '../lib/cdk-app-stack';

const app = new cdk.App();
new RagImplementationStack110820252314(app, 'RagImplementationStack110820252314', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
