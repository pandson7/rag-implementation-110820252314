# RAG Implementation - Document Query System

A complete Retrieval Augmented Generation (RAG) system built with AWS services that enables natural language querying of documents through an intuitive web interface.

## 🚀 Features

- **Document Ingestion**: Automated processing and indexing of PDF documents
- **Semantic Search**: Powered by Amazon Kendra for intelligent document retrieval
- **Natural Language Interface**: Ask questions in plain English
- **Source Citations**: Get answers with document references and excerpts
- **Query History**: Track and log all queries in DynamoDB
- **Real-time Processing**: Instant search results with loading indicators
- **Responsive UI**: Clean React-based web interface

## 🏗️ Architecture

### AWS Infrastructure
- **Amazon Kendra**: Semantic search and document indexing
- **Amazon S3**: Document storage (`rag-documents-110820252314`)
- **Amazon DynamoDB**: Query history logging (`rag-query-history-110820252314`)
- **AWS CDK**: Infrastructure as Code deployment

### Application Stack
- **Backend**: Node.js with Express.js (Port 8000)
- **Frontend**: React.js application (Port 3000)
- **Database**: DynamoDB for query logging
- **Search**: Amazon Kendra for semantic document retrieval

## 📋 Prerequisites

- Node.js (v14 or higher)
- AWS CLI configured with appropriate permissions
- AWS CDK installed (`npm install -g aws-cdk`)
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd rag-implementation-110820252314
```

### 2. Deploy AWS Infrastructure
```bash
cd cdk-app
npm install
cdk bootstrap  # First time only
cdk deploy
```

### 3. Setup Backend
```bash
cd ../backend
npm install
npm start  # Starts server on port 8000
```

### 4. Setup Frontend
```bash
cd ../frontend
npm install
npm start  # Starts React app on port 3000
```

## 🎯 Usage

### Accessing the Application
1. Open your browser and navigate to `http://localhost:3000`
2. Enter your question in the search box
3. Click "Search" or press Enter
4. View results with source document citations

### Sample Queries
- "What are the key principles of SaaS architecture?"
- "How does multi-tenancy work in SaaS?"
- "What is SaaS migration?"
- "What are the benefits of cloud-native architecture?"

### Adding Documents
1. Upload documents to the S3 bucket: `rag-documents-110820252314`
2. Kendra will automatically index new documents
3. Documents become searchable within minutes

## 📁 Project Structure

```
rag-implementation-110820252314/
├── README.md                    # This file
├── PROJECT_SUMMARY.md          # Detailed project summary
├── user_requirements.txt       # Original requirements
├── frontend/                   # React web application
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── App.css            # Styling
│   │   └── index.js           # Entry point
│   ├── public/                # Static assets
│   └── package.json           # Dependencies
├── backend/                    # Node.js Express server
│   ├── server.js              # Main server file
│   ├── test-rag.js           # Testing utilities
│   └── package.json          # Dependencies
├── cdk-app/                   # AWS CDK infrastructure
│   ├── lib/
│   │   └── cdk-app-stack.ts  # CDK stack definition
│   ├── bin/
│   │   └── cdk-app.ts        # CDK app entry point
│   └── package.json          # Dependencies
├── specs/                     # Technical specifications
├── pricing/                   # Cost analysis
├── generated-diagrams/        # Architecture diagrams
├── jira-stories-summary.md   # Development stories
└── qr-code/                  # QR code for easy access
```

## 🔧 Configuration

### Environment Variables
The application uses the following AWS resources (configured in CDK):
- **Kendra Index ID**: `ace512ca-c50c-4ce3-8877-3489945e7917`
- **S3 Bucket**: `rag-documents-110820252314`
- **DynamoDB Table**: `rag-query-history-110820252314`
- **Region**: `us-east-1`

### Backend Configuration
```javascript
// server.js
const KENDRA_INDEX_ID = 'ace512ca-c50c-4ce3-8877-3489945e7917';
const DYNAMODB_TABLE = 'rag-query-history-110820252314';
const PORT = 8000;
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
node test-rag.js
```

### Manual Testing
1. Start both frontend and backend servers
2. Navigate to `http://localhost:3000`
3. Submit test queries and verify results
4. Check DynamoDB for query logging

### Health Check
```bash
curl http://localhost:8000/api/health
```

## 📊 API Endpoints

### GET /api/health
Returns system health status
```json
{
  "status": "healthy",
  "timestamp": "2024-11-09T04:43:00.000Z"
}
```

### POST /api/query
Process natural language queries
```json
{
  "query": "What are the key principles of SaaS architecture?"
}
```

Response:
```json
{
  "answer": "Based on the document...",
  "sources": [
    {
      "title": "saas-architecture-fundamentals.pdf",
      "excerpt": "Document excerpt...",
      "confidence": "MEDIUM"
    }
  ]
}
```

## 🔍 Troubleshooting

### Common Issues

1. **Kendra Index Not Found**
   - Verify CDK deployment completed successfully
   - Check AWS console for Kendra index status

2. **CORS Errors**
   - Ensure backend server is running on port 8000
   - Check CORS configuration in server.js

3. **No Search Results**
   - Verify documents are uploaded to S3 bucket
   - Check Kendra data source synchronization status

4. **Frontend Not Loading**
   - Ensure React development server is running
   - Check for port conflicts (default: 3000)

### Logs and Debugging
- Backend logs: Check console output from `npm start` in backend/
- Frontend logs: Check browser developer console
- AWS logs: Check CloudWatch for Kendra and DynamoDB logs

## 💰 Cost Considerations

- **Amazon Kendra**: Developer edition (~$810/month when active)
- **Amazon S3**: Minimal storage costs for documents
- **Amazon DynamoDB**: Pay-per-request pricing for query logging
- **Data Transfer**: Minimal costs for API calls

**Note**: Remember to destroy resources when not needed:
```bash
cd cdk-app
cdk destroy
```

## 🚀 Deployment to Production

### AWS Production Setup
1. Update CDK stack for production environment
2. Configure API Gateway for backend
3. Deploy frontend to S3 + CloudFront
4. Set up proper IAM roles and security groups
5. Configure monitoring and alerting

### Environment Variables
Set appropriate environment variables for production:
- AWS region
- Kendra index ID
- S3 bucket name
- DynamoDB table name

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review AWS service documentation
3. Check project issues on GitHub
4. Contact the development team

## 🎉 Acknowledgments

- AWS CDK team for infrastructure as code capabilities
- Amazon Kendra team for semantic search functionality
- React team for the frontend framework
- Express.js team for the backend framework

---

**Status**: ✅ Fully Functional | **Last Updated**: November 2024 | **Version**: 1.0.0
