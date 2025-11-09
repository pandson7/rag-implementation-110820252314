# RAG Implementation Architecture Documentation

## Overview
This document describes the AWS Architecture diagram for the RAG (Retrieval-Augmented Generation) implementation, generated based on the technical design specification.

## Architecture Components

### Frontend Layer
- **React App (Port 3000)**: Single-page application providing the user interface
  - Query input component for natural language questions
  - Results display with source document references
  - Loading states for user feedback during processing

### Backend Layer
- **API Gateway**: REST API endpoint for frontend communication
  - Handles HTTP requests from React frontend
  - Provides rate limiting and request validation
  - Routes requests to Node.js API service

- **Node.js API (Port 8000)**: Core application server
  - Processes natural language queries
  - Orchestrates communication between Kendra and Bedrock
  - Formats responses with source citations
  - Manages query history storage

### AWS AI/ML Services
- **Amazon Kendra**: Document search and indexing service
  - Developer edition for prototype implementation
  - Indexes documents from S3 bucket
  - Performs semantic search on user queries
  - Returns relevant document passages with confidence scores

- **Amazon Bedrock (Claude 4)**: Large Language Model service
  - Model: anthropic.claude-3-sonnet-20240229-v1:0
  - Generates contextual responses using retrieved documents
  - Configured with low temperature (0.1) for consistent responses
  - Max tokens: 4000 for comprehensive answers

### Storage Layer
- **S3 Bucket**: Document storage
  - Contains documents from ~/ea_sample_docs/rag_docs
  - Supports PDF, TXT, DOCX, HTML formats
  - Serves as data source for Kendra indexing

- **DynamoDB**: Query history storage
  - Stores user queries and responses for analytics
  - Schema includes query_id, timestamp, user_query, response, source_documents
  - Enables query pattern analysis and system optimization

### Infrastructure
- **Lambda Functions**: Document processing automation
  - Handles document upload and preprocessing
  - Triggers Kendra data source synchronization
  - Manages document metadata extraction

- **IAM Roles & Policies**: Security and access control
  - Least privilege access for all services
  - Service-specific permissions for Kendra and Bedrock
  - Secure communication between components

## Data Flow

1. **User Query**: User submits natural language question through React frontend
2. **API Gateway**: Routes request to Node.js API server
3. **Document Search**: Node.js API queries Kendra for relevant documents
4. **Context Retrieval**: Kendra returns relevant document passages
5. **Response Generation**: Bedrock Claude 4 generates answer using retrieved context
6. **History Storage**: Query and response stored in DynamoDB
7. **Response Delivery**: Formatted response with sources returned to frontend

## Security Features

- **IAM Policies**: Enforce least privilege access across all services
- **API Rate Limiting**: Prevent abuse of Bedrock API calls
- **Input Validation**: Sanitize user queries before processing
- **Error Handling**: Secure error responses without internal system exposure

## Performance Considerations

- **Kendra Optimization**: Appropriate query types for search vs FAQ scenarios
- **Response Caching**: Cache frequent queries to reduce Bedrock API calls
- **Async Processing**: Non-blocking query handling for better user experience
- **Connection Pooling**: Efficient AWS SDK client management

## File Location
- **Diagram**: `/home/pandson/echo-architect-artifacts/rag-implementation-110820252314/generated-diagrams/generated-diagrams/rag_architecture.png`
- **Documentation**: `/home/pandson/echo-architect-artifacts/rag-implementation-110820252314/generated-diagrams/architecture_documentation.md`

## Technical Specifications

### API Endpoints
- **POST /api/query**: Process natural language queries
- **GET /api/health**: System health check

### Development Environment
- **Frontend**: React development server (port 3000)
- **Backend**: Node.js Express server (port 8000)
- **AWS Services**: Configured via AWS CLI profiles

### Dependencies
- **Frontend**: React, Axios, Material-UI
- **Backend**: Express.js, AWS SDK v3, cors, dotenv
- **Infrastructure**: AWS CDK v2, TypeScript

This architecture provides a scalable, secure, and efficient RAG implementation leveraging AWS managed services for document search and language model capabilities.
