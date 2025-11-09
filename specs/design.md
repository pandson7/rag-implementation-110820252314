# Technical Design Document

## Architecture Overview

The RAG implementation follows a three-tier architecture:
- **Frontend**: React-based web interface for user interactions
- **Backend**: Node.js API server handling query processing and orchestration
- **AWS Services**: Amazon Kendra for document indexing/search and Amazon Bedrock Claude 4 for language processing

## System Components

### 1. Document Processing Layer
- **Amazon Kendra Index**: Stores and indexes documents from ~/ea_sample_docs/rag_docs
- **Document Ingestion Service**: Node.js service to upload documents to Kendra
- **Supported Formats**: PDF, TXT, DOCX, HTML files

### 2. Query Processing Layer
- **Query Handler**: Node.js service that receives natural language queries
- **Kendra Search**: Performs semantic search to retrieve relevant document passages
- **Bedrock Integration**: Uses Claude 4 to generate contextual responses
- **Response Formatter**: Structures answers with source citations

### 3. Web Interface Layer
- **React Frontend**: Single-page application for query submission
- **Query Input Component**: Text area for natural language questions
- **Results Display Component**: Shows answers with source document references
- **Loading States**: Visual feedback during query processing

## Data Flow

```
User Query → React Frontend → Node.js API → Kendra Search → Document Retrieval → Bedrock Claude 4 → Response Generation → Frontend Display
```

## AWS Services Configuration

### Amazon Kendra
- **Index Type**: Developer edition for prototype
- **Data Source**: S3 bucket containing documents from ~/ea_sample_docs/rag_docs
- **Language**: English
- **Document Metadata**: File name, path, last modified date

### Amazon Bedrock
- **Model**: Claude 4 (anthropic.claude-3-sonnet-20240229-v1:0)
- **Max Tokens**: 4000
- **Temperature**: 0.1 for consistent responses
- **System Prompt**: Configured to use only provided context from Kendra

### DynamoDB
- **Query History Table**: Stores user queries and responses for analytics
- **Schema**: 
  - query_id (String, Primary Key)
  - timestamp (String)
  - user_query (String)
  - response (String)
  - source_documents (List)

## API Design

### Backend Endpoints

#### POST /api/query
- **Purpose**: Process natural language queries
- **Input**: `{ "question": "string" }`
- **Output**: 
```json
{
  "answer": "string",
  "sources": [
    {
      "document": "filename",
      "excerpt": "relevant passage",
      "confidence": "number"
    }
  ],
  "query_id": "string"
}
```

#### GET /api/health
- **Purpose**: System health check
- **Output**: `{ "status": "healthy", "services": {...} }`

## Infrastructure as Code

### CDK Stack Components
- **Kendra Index**: Configured with document data source
- **S3 Bucket**: Stores documents for Kendra ingestion
- **Lambda Functions**: Document processing and query handling
- **API Gateway**: REST API for frontend communication
- **DynamoDB Table**: Query history storage
- **IAM Roles**: Service permissions for Kendra and Bedrock access

## Security Considerations

- **IAM Policies**: Least privilege access for all services
- **API Rate Limiting**: Prevent abuse of Bedrock API calls
- **Input Validation**: Sanitize user queries before processing
- **Error Handling**: Avoid exposing internal system details

## Performance Considerations

- **Kendra Query Optimization**: Use appropriate query types (search vs FAQ)
- **Response Caching**: Cache frequent queries to reduce Bedrock calls
- **Async Processing**: Non-blocking query handling
- **Connection Pooling**: Efficient AWS SDK client management

## Development Environment

### Local Setup
- **Frontend**: React development server on port 3000
- **Backend**: Node.js Express server on port 8000
- **AWS Services**: Use AWS CLI profiles for local development
- **Environment Variables**: Store AWS credentials and region configuration

### Dependencies
- **Frontend**: React, Axios, Material-UI components
- **Backend**: Express.js, AWS SDK v3, cors, dotenv
- **Infrastructure**: AWS CDK v2, TypeScript

## Testing Strategy

### Unit Tests
- **Backend Services**: Jest for API endpoint testing
- **Frontend Components**: React Testing Library
- **AWS Service Mocks**: Mock Kendra and Bedrock responses

### Integration Tests
- **End-to-End**: Cypress for full user workflow testing
- **API Testing**: Postman collection for backend validation
- **Document Processing**: Verify Kendra indexing with sample documents

### Sample Test Queries
1. "What is the main topic discussed in the documents?"
2. "Can you summarize the key findings?"
3. "What recommendations are provided?"
4. "Who are the main stakeholders mentioned?"

## Deployment Process

1. **Document Upload**: Copy files to S3 bucket
2. **Kendra Indexing**: Trigger data source sync
3. **CDK Deployment**: Deploy infrastructure stack
4. **Backend Deployment**: Start Node.js API server
5. **Frontend Build**: Create production React build
6. **Health Checks**: Verify all services are operational
