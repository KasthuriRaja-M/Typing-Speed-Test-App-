import React, { useState, useEffect, useRef } from 'react';
import './TypingTest.css';

const TypingTest = ({ onTestComplete }) => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [errors, setErrors] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once. Pangrams are often used to display font samples and test keyboards.",
    "Programming is the art of telling another human being what one wants the computer to do. It requires logical thinking and creative problem-solving skills.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. Every expert was once a beginner who never gave up on their dreams.",
    "The internet is not just one thing, it's a collection of things – of numerous communications networks that all speak the same digital language.",
    "Innovation distinguishes between a leader and a follower. The future belongs to those who believe in the beauty of their dreams and have the courage to pursue them."
  ];

  useEffect(() => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      calculateResults();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTest = () => {
    setIsActive(true);
    setStartTime(Date.now());
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    if (!isActive && !startTime) {
      startTest();
    }

    const value = e.target.value;
    setUserInput(value);

    // Check for errors
    let newErrors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        newErrors++;
      }
    }
    setErrors(newErrors);
    setCurrentIndex(value.length);

    // Check if user has typed everything correctly
    if (value === text) {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000; // in seconds
    const wordsTyped = text.split(' ').length;
    const wordsPerMinute = Math.round((wordsTyped / timeElapsed) * 60);
    const accuracy = Math.round(((text.length - errors) / text.length) * 100);

    onTestComplete({
      wordsPerMinute,
      accuracy,
      errors,
      timeElapsed: Math.round(timeElapsed),
      totalWords: wordsTyped
    });
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'char';
      if (index < currentIndex) {
        className += userInput[index] === char ? ' correct' : ' incorrect';
      } else if (index === currentIndex) {
        className += ' current';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-test">
      <div className="test-header">
        <div className="timer">
          <span className="timer-label">Time Left:</span>
          <span className="timer-value">{timeLeft}s</span>
        </div>
        <div className="stats">
          <span>Errors: {errors}</span>
          <span>Progress: {Math.round((currentIndex / text.length) * 100)}%</span>
        </div>
      </div>

      <div className="text-display">
        {renderText()}
      </div>

      <div className="input-area">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          disabled={timeLeft === 0}
          className="typing-input"
        />
      </div>

      {!isActive && timeLeft === 60 && (
        <div className="instructions">
          <p>Click in the text area below and start typing to begin the test!</p>
        </div>
      )}
    </div>
  );
};

export default TypingTest; 