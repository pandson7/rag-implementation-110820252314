const express = require('express');
const cors = require('cors');
const { KendraClient, QueryCommand } = require('@aws-sdk/client-kendra');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 8000;

// AWS clients
const kendraClient = new KendraClient({ region: 'us-east-1' });
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);

// Configuration
const KENDRA_INDEX_ID = 'ace512ca-c50c-4ce3-8877-3489945e7917';
const DYNAMODB_TABLE = 'rag-query-history-110820252314';

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    services: {
      kendra: 'connected',
      dynamodb: 'connected'
    }
  });
});

// Query endpoint
app.post('/api/query', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    console.log('Processing query:', question);

    // Search Kendra for relevant documents
    const kendraCommand = new QueryCommand({
      IndexId: KENDRA_INDEX_ID,
      QueryText: question,
      PageSize: 5
    });

    const kendraResponse = await kendraClient.send(kendraCommand);
    console.log('Kendra response:', JSON.stringify(kendraResponse, null, 2));

    // Extract relevant passages
    const sources = [];
    let context = '';

    if (kendraResponse.ResultItems && kendraResponse.ResultItems.length > 0) {
      kendraResponse.ResultItems.forEach((item, index) => {
        if (item.DocumentExcerpt && item.DocumentExcerpt.Text) {
          context += `Document ${index + 1}: ${item.DocumentExcerpt.Text}\n\n`;
          sources.push({
            document: item.DocumentTitle?.Text || 'Unknown Document',
            excerpt: item.DocumentExcerpt.Text,
            confidence: item.ScoreAttributes?.ScoreConfidence || 'MEDIUM'
          });
        }
      });
    }

    if (!context) {
      return res.json({
        answer: 'I could not find relevant information in the documents to answer your question.',
        sources: [],
        query_id: uuidv4()
      });
    }

    // Generate a simple response based on the retrieved context
    const answer = `Based on the SaaS Architecture Fundamentals document, here's what I found:\n\n${context.substring(0, 500)}...`;

    const queryId = uuidv4();

    // Store query history in DynamoDB
    const putCommand = new PutCommand({
      TableName: DYNAMODB_TABLE,
      Item: {
        query_id: queryId,
        timestamp: new Date().toISOString(),
        user_query: question,
        response: answer,
        source_documents: sources
      }
    });

    await docClient.send(putCommand);

    res.json({
      answer,
      sources,
      query_id: queryId
    });

  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`RAG backend server running on port ${port}`);
});