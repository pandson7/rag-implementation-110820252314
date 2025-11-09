# RAG Implementation with Amazon Kendra and Bedrock Cost Analysis Estimate Report

## Service Overview

RAG Implementation with Amazon Kendra and Bedrock is a fully managed, serverless service that allows you to This project uses multiple AWS services.. This service follows a pay-as-you-go pricing model, making it cost-effective for various workloads.

## Pricing Model

This cost analysis estimate is based on the following pricing model:
- **ON DEMAND** pricing (pay-as-you-go) unless otherwise specified
- Standard service configurations without reserved capacity or savings plans
- No caching or optimization techniques applied

## Assumptions

- Using Amazon Kendra Developer Edition for prototype/development
- Claude 3.5 Sonnet model for Bedrock (anthropic.claude-3-sonnet-20240229-v1:0)
- Standard ON DEMAND pricing model for all services
- US East (N. Virginia) region for all services
- DynamoDB On-Demand billing mode
- S3 Standard storage class
- API Gateway REST API (not HTTP API)
- Lambda functions with 512MB memory allocation
- Average document size of 10KB for Kendra indexing
- Average query response size of 2KB
- No data transfer costs between services in same region
- No reserved capacity or savings plans applied

## Limitations and Exclusions

- Data transfer costs between regions
- CloudFront distribution costs
- Route 53 DNS costs
- VPC and networking costs
- Development and testing environment costs
- Backup and disaster recovery costs
- Monitoring and logging costs (CloudWatch)
- Security services costs (WAF, Shield)
- Custom model training costs for Bedrock
- Enterprise support costs

## Cost Breakdown

### Unit Pricing Details

| Service | Resource Type | Unit | Price | Free Tier |
|---------|--------------|------|-------|------------|
| Amazon Kendra Developer Edition | Base Capacity | hour | $1.125 | No free tier available for Kendra |
| Amazon Bedrock Foundation Models (Claude 3.5 Sonnet) | Input Tokens | 1,000,000 tokens | $3.00 | No free tier for Bedrock foundation models |
| Amazon Bedrock Foundation Models (Claude 3.5 Sonnet) | Output Tokens | 1,000,000 tokens | $15.00 | No free tier for Bedrock foundation models |
| AWS Lambda | Requests | 1,000,000 requests | $0.20 | 1M requests and 400,000 GB-seconds per month free |
| AWS Lambda | Compute | GB-second | $0.0000166667 | 1M requests and 400,000 GB-seconds per month free |
| Amazon DynamoDB | Storage | GB-month (after 25GB free) | $0.25 | 25 GB storage and 25 RCU/WCU free tier |
| Amazon DynamoDB | Read Requests | million RRUs | $0.125 | 25 GB storage and 25 RCU/WCU free tier |
| Amazon DynamoDB | Write Requests | million WRUs | $0.625 | 25 GB storage and 25 RCU/WCU free tier |
| Amazon S3 | Storage | GB-month (first 50TB) | $0.023 | 5 GB storage, 20,000 GET requests, 2,000 PUT requests for 12 months |
| Amazon S3 | Get Requests | million requests | $0.40 | 5 GB storage, 20,000 GET requests, 2,000 PUT requests for 12 months |
| Amazon S3 | Put Requests | million requests | $2.00 | 5 GB storage, 20,000 GET requests, 2,000 PUT requests for 12 months |
| Amazon API Gateway | Api Calls | million requests (first 333M) | $3.50 | 1 million API calls per month for 12 months |

### Cost Calculation

| Service | Usage | Calculation | Monthly Cost |
|---------|-------|-------------|-------------|
| Amazon Kendra Developer Edition | 24/7 operation for development and testing (Hours Per Month: 720 hours) | $1.125/hour × 720 hours = $810.00/month | $810.00 |
| Amazon Bedrock Foundation Models (Claude 3.5 Sonnet) | Processing queries with context from Kendra (Low Usage: 2M input + 0.5M output tokens, Medium Usage: 5M input + 1M output tokens, High Usage: 10M input + 2M output tokens) | Low: $3.00×2 + $15.00×0.5 = $13.50; Medium: $3.00×5 + $15.00×1 = $30.00; High: $3.00×10 + $15.00×2 = $60.00 | $24.00 - $120.00 |
| AWS Lambda | Query processing and API handling (Requests: 10,000 - 100,000 requests/month, Compute: 512MB × 1s average × requests) | Mostly covered by free tier for development usage | $0.50 - $5.00 |
| Amazon DynamoDB | Query history and metadata storage (Storage: 1-10 GB, Read Requests: 100K - 1M per month, Write Requests: 10K - 100K per month) | Storage mostly free tier, minimal request costs | $1.00 - $10.00 |
| Amazon S3 | Document storage for Kendra data source (Storage: 10-100 GB documents, Get Requests: 10K - 100K per month, Put Requests: 1K - 10K per month) | 10GB: $0.23, 100GB: $2.30 + minimal request costs | $2.00 - $20.00 |
| Amazon API Gateway | REST API for frontend communication (Api Calls: 10K - 1M requests per month) | 10K requests: free tier, 100K: $0.35, 1M: $3.50 | $0.35 - $35.00 |
| **Total** | **All services** | **Sum of all calculations** | **$837.85/month** |

### Free Tier

Free tier information by service:
- **Amazon Kendra Developer Edition**: No free tier available for Kendra
- **Amazon Bedrock Foundation Models (Claude 3.5 Sonnet)**: No free tier for Bedrock foundation models
- **AWS Lambda**: 1M requests and 400,000 GB-seconds per month free
- **Amazon DynamoDB**: 25 GB storage and 25 RCU/WCU free tier
- **Amazon S3**: 5 GB storage, 20,000 GET requests, 2,000 PUT requests for 12 months
- **Amazon API Gateway**: 1 million API calls per month for 12 months

## Cost Scaling with Usage

The following table illustrates how cost estimates scale with different usage levels:

| Service | Low Usage | Medium Usage | High Usage |
|---------|-----------|--------------|------------|
| Amazon Kendra Developer Edition | $405/month | $810/month | $1620/month |
| Amazon Bedrock Foundation Models (Claude 3.5 Sonnet) | $12/month | $24/month | $48/month |
| AWS Lambda | $0/month | $0/month | $1/month |
| Amazon DynamoDB | $0/month | $1/month | $2/month |
| Amazon S3 | $1/month | $2/month | $4/month |
| Amazon API Gateway | $0/month | $0/month | $0/month |

### Key Cost Factors

- **Amazon Kendra Developer Edition**: 24/7 operation for development and testing
- **Amazon Bedrock Foundation Models (Claude 3.5 Sonnet)**: Processing queries with context from Kendra
- **AWS Lambda**: Query processing and API handling
- **Amazon DynamoDB**: Query history and metadata storage
- **Amazon S3**: Document storage for Kendra data source
- **Amazon API Gateway**: REST API for frontend communication

## Projected Costs Over Time

The following projections show estimated monthly costs over a 12-month period based on different growth patterns:

Base monthly cost calculation:

| Service | Monthly Cost |
|---------|-------------|
| Amazon Kendra Developer Edition | $810.00 |
| Amazon Bedrock Foundation Models (Claude 3.5 Sonnet) | $24.00 |
| AWS Lambda | $0.50 |
| Amazon DynamoDB | $1.00 |
| Amazon S3 | $2.00 |
| Amazon API Gateway | $0.35 |
| **Total Monthly Cost** | **$837** |

| Growth Pattern | Month 1 | Month 3 | Month 6 | Month 12 |
|---------------|---------|---------|---------|----------|
| Steady | $837/mo | $837/mo | $837/mo | $837/mo |
| Moderate | $837/mo | $923/mo | $1069/mo | $1433/mo |
| Rapid | $837/mo | $1013/mo | $1349/mo | $2390/mo |

* Steady: No monthly growth (1.0x)
* Moderate: 5% monthly growth (1.05x)
* Rapid: 10% monthly growth (1.1x)

## Detailed Cost Analysis

### Pricing Model

ON DEMAND


### Exclusions

- Data transfer costs between regions
- CloudFront distribution costs
- Route 53 DNS costs
- VPC and networking costs
- Development and testing environment costs
- Backup and disaster recovery costs
- Monitoring and logging costs (CloudWatch)
- Security services costs (WAF, Shield)
- Custom model training costs for Bedrock
- Enterprise support costs

### Recommendations

#### Immediate Actions

- Start with Kendra Developer Edition for prototyping - can upgrade to Enterprise later
- Implement prompt optimization to reduce Bedrock token usage
- Use DynamoDB On-Demand billing to avoid over-provisioning
- Leverage AWS Free Tier benefits for Lambda, DynamoDB, S3, and API Gateway
- Monitor usage patterns before scaling to production



## Cost Optimization Recommendations

### Immediate Actions

- Start with Kendra Developer Edition for prototyping - can upgrade to Enterprise later
- Implement prompt optimization to reduce Bedrock token usage
- Use DynamoDB On-Demand billing to avoid over-provisioning

### Best Practices

- Regularly review costs with AWS Cost Explorer
- Consider reserved capacity for predictable workloads
- Implement automated scaling based on demand

## Conclusion

By following the recommendations in this report, you can optimize your RAG Implementation with Amazon Kendra and Bedrock costs while maintaining performance and reliability. Regular monitoring and adjustment of your usage patterns will help ensure cost efficiency as your workload evolves.
