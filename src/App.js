import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TypingTest from './components/TypingTest';
import Results from './components/Results';

function App() {
  const [isTestActive, setIsTestActive] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const handleTestComplete = (results) => {
    setTestResults(results);
    setIsTestActive(false);
  };

  const startNewTest = () => {
    setTestResults(null);
    setIsTestActive(true);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🚀 Typing Speed Test</h1>
          <p>Test your typing speed and accuracy</p>
        </header>
        
        {!isTestActive && !testResults && (
          <div className="start-screen">
            <h2>Ready to test your typing skills?</h2>
            <p>You'll have 60 seconds to type as many words as possible.</p>
            <button className="start-btn" onClick={startNewTest}>
              Start Test
            </button>
          </div>
        )}

        {isTestActive && (
          <TypingTest onTestComplete={handleTestComplete} />
        )}

        {testResults && !isTestActive && (
          <Results results={testResults} onRestart={startNewTest} />
        )}
      </div>
    </div>
  );
}

export default App; 