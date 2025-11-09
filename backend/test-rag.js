const { KendraClient, QueryCommand } = require('@aws-sdk/client-kendra');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

// AWS clients
const kendraClient = new KendraClient({ region: 'us-east-1' });
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);

// Configuration
const KENDRA_INDEX_ID = 'ace512ca-c50c-4ce3-8877-3489945e7917';
const DYNAMODB_TABLE = 'rag-query-history-110820252314';

async function testRAGSystem() {
  try {
    console.log('Testing RAG System...');
    
    const testQueries = [
      'What are the key principles of SaaS architecture?',
      'How does multi-tenancy work in SaaS?',
      'What is SaaS migration?'
    ];

    for (const query of testQueries) {
      console.log(`\n--- Testing Query: "${query}" ---`);
      
      // Search Kendra
      const kendraCommand = new QueryCommand({
        IndexId: KENDRA_INDEX_ID,
        QueryText: query,
        PageSize: 3
      });

      const kendraResponse = await kendraClient.send(kendraCommand);
      
      if (kendraResponse.ResultItems && kendraResponse.ResultItems.length > 0) {
        console.log(`Found ${kendraResponse.ResultItems.length} results`);
        
        kendraResponse.ResultItems.forEach((item, index) => {
          console.log(`\nResult ${index + 1}:`);
          console.log(`Title: ${item.DocumentTitle?.Text || 'N/A'}`);
          console.log(`Confidence: ${item.ScoreAttributes?.ScoreConfidence || 'N/A'}`);
          console.log(`Excerpt: ${item.DocumentExcerpt?.Text?.substring(0, 200) || 'N/A'}...`);
        });
        
        // Log to DynamoDB
        const queryId = uuidv4();
        const putCommand = new PutCommand({
          TableName: DYNAMODB_TABLE,
          Item: {
            query_id: queryId,
            timestamp: new Date().toISOString(),
            user_query: query,
            response: `Found ${kendraResponse.ResultItems.length} relevant documents`,
            source_documents: kendraResponse.ResultItems.map(item => ({
              document: item.DocumentTitle?.Text || 'Unknown',
              confidence: item.ScoreAttributes?.ScoreConfidence || 'MEDIUM'
            }))
          }
        });
        
        await docClient.send(putCommand);
        console.log(`Query logged with ID: ${queryId}`);
        
      } else {
        console.log('No results found');
      }
    }
    
    console.log('\n✅ RAG System test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error testing RAG system:', error);
  }
}

// Run the test
testRAGSystem();