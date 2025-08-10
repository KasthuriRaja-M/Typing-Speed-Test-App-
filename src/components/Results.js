import React from 'react';
import './Results.css';

const Results = ({ results, onRestart }) => {
  const { wordsPerMinute, accuracy, errors, timeElapsed, totalWords } = results;

  const getSpeedLevel = (wpm) => {
    if (wpm >= 80) return { level: 'Expert', color: '#28a745', emoji: '🚀' };
    if (wpm >= 60) return { level: 'Advanced', color: '#17a2b8', emoji: '⚡' };
    if (wpm >= 40) return { level: 'Intermediate', color: '#ffc107', emoji: '👍' };
    if (wpm >= 20) return { level: 'Beginner', color: '#fd7e14', emoji: '📚' };
    return { level: 'Novice', color: '#dc3545', emoji: '🎯' };
  };

  const getAccuracyLevel = (acc) => {
    if (acc >= 95) return { level: 'Excellent', color: '#28a745' };
    if (acc >= 85) return { level: 'Good', color: '#17a2b8' };
    if (acc >= 75) return { level: 'Fair', color: '#ffc107' };
    return { level: 'Needs Practice', color: '#dc3545' };
  };

  const speedInfo = getSpeedLevel(wordsPerMinute);
  const accuracyInfo = getAccuracyLevel(accuracy);

  return (
    <div className="results">
      <div className="results-header">
        <h2>🎉 Test Complete!</h2>
        <p>Here are your typing results</p>
      </div>

      <div className="results-grid">
        <div className="result-card main-result">
          <div className="result-icon" style={{ color: speedInfo.color }}>
            {speedInfo.emoji}
          </div>
          <div className="result-value">{wordsPerMinute}</div>
          <div className="result-label">Words Per Minute</div>
          <div className="result-level" style={{ color: speedInfo.color }}>
            {speedInfo.level}
          </div>
        </div>

        <div className="result-card">
          <div className="result-icon" style={{ color: accuracyInfo.color }}>
            🎯
          </div>
          <div className="result-value">{accuracy}%</div>
          <div className="result-label">Accuracy</div>
          <div className="result-level" style={{ color: accuracyInfo.color }}>
            {accuracyInfo.level}
          </div>
        </div>

        <div className="result-card">
          <div className="result-icon">⏱️</div>
          <div className="result-value">{timeElapsed}s</div>
          <div className="result-label">Time Taken</div>
        </div>

        <div className="result-card">
          <div className="result-icon">📝</div>
          <div className="result-value">{totalWords}</div>
          <div className="result-label">Words Typed</div>
        </div>

        <div className="result-card">
          <div className="result-icon">❌</div>
          <div className="result-value">{errors}</div>
          <div className="result-label">Errors Made</div>
        </div>

        <div className="result-card">
          <div className="result-icon">📊</div>
          <div className="result-value">{Math.round((totalWords / timeElapsed) * 60)}</div>
          <div className="result-label">Raw WPM</div>
        </div>
      </div>

      <div className="results-actions">
        <button className="restart-btn" onClick={onRestart}>
          Try Again
        </button>
        <button className="share-btn" onClick={() => {
          const text = `I achieved ${wordsPerMinute} WPM with ${accuracy}% accuracy on the Typing Speed Test! 🚀`;
          if (navigator.share) {
            navigator.share({
              title: 'My Typing Speed Test Results',
              text: text
            });
          } else {
            navigator.clipboard.writeText(text);
            alert('Results copied to clipboard!');
          }
        }}>
          Share Results
        </button>
      </div>

      <div className="results-tips">
        <h3>💡 Tips to Improve</h3>
        <ul>
          <li>Practice regularly with different texts</li>
          <li>Focus on accuracy over speed initially</li>
          <li>Use proper finger positioning on the keyboard</li>
          <li>Take breaks to avoid fatigue</li>
          <li>Try typing without looking at the keyboard</li>
        </ul>
      </div>
    </div>
  );
};

export default Results; 