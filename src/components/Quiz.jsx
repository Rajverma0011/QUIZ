import { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';

function Quiz({ questions, onQuizComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [timer, setTimer] = useState(30); // New state for the timer

  // This useEffect hook manages the countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts or question changes
    return () => clearInterval(interval);
  }, [currentQuestionIndex]); // It resets and restarts whenever the question changes

  // This useEffect hook handles what happens when the timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      handleNext(); // Automatically move to the next question
    }
  }, [timer]);

  const handleAnswerSelect = (selectedAnswer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30); // Reset timer for the next question
    } else {
      onQuizComplete(userAnswers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="progress-indicator">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        {/* Display the timer */}
        <p className="timer">Time Left: {timer}s</p>
      </div>

      <QuestionCard
        question={currentQuestion.question}
        options={currentQuestion.options}
        onAnswerSelect={handleAnswerSelect}
        selectedAnswer={userAnswers[currentQuestionIndex]}
      />

      <div className="navigation-controls">
        <button
          onClick={handleNext}
          className="primary-btn"
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default Quiz;