import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';

import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [gameState, setGameState] = useState('start'); // Manages which screen to show: 'start', 'quiz', or 'results'
  const [loading, setLoading] = useState(true);

  // Fetches, shuffles, and selects 10 questions from the JSON file
  const fetchQuestions = () => {
    setLoading(true);
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        setQuestions(selected);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  };

  // This runs once when the app first loads
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handler to start the quiz from the start screen
  const handleStartQuiz = () => {
    setGameState('quiz');
  };

  // Handler for when the user finishes the quiz
  const handleQuizCompletion = (answers) => {
    setUserAnswers(answers);
    setGameState('results');
  };

  // Handler to restart the quiz from the results screen
  const handleRestartQuiz = () => {
    fetchQuestions(); // Get a new set of questions
    setGameState('start');
  };

  // Helper function to decide which component to render
  const renderGameState = () => {
    if (loading && gameState !== 'results') {
      return <p>Loading questions...</p>;
    }

    switch (gameState) {
      case 'quiz':
        return <Quiz questions={questions} onQuizComplete={handleQuizCompletion} />;
      case 'results':
        return <Results questions={questions} userAnswers={userAnswers} onRestart={handleRestartQuiz} />;
      case 'start':
      default:
        return <StartScreen onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <div className="app-container">
      {/* Conditionally render the background animation. It will be removed on the results page. */}
      {gameState !== 'results' && (
        // You can add a background animation component here, for example:
        // <BackgroundAnimation />
        null
      )}



      <div className="content-overlay">
        <div className="quiz-container">
          <h1 className="quiz-title">The React Quiz</h1>
          {renderGameState()}
        </div>
      </div>
    </div>
  );
}

export default App;