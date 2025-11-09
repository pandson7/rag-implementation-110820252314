import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:8000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question.trim() }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>RAG Document Query System</h1>
        <p>Ask questions about the SaaS Architecture Fundamentals document</p>
      </header>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="query-form">
          <div className="input-group">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question about the documents..."
              rows="4"
              className="question-input"
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading || !question.trim()}
          >
            {loading ? 'Processing...' : 'Ask Question'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {response && (
          <div className="response-section">
            <div className="answer">
              <h3>Answer:</h3>
              <p>{response.answer}</p>
            </div>

            {response.sources && response.sources.length > 0 && (
              <div className="sources">
                <h3>Sources:</h3>
                {response.sources.map((source, index) => (
                  <div key={index} className="source-item">
                    <h4>{source.document}</h4>
                    <p className="excerpt">{source.excerpt}</p>
                    <span className="confidence">Confidence: {source.confidence}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="query-id">
              <small>Query ID: {response.query_id}</small>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;