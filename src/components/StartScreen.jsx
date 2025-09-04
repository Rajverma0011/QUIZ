function StartScreen({ onStartQuiz }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2 className="quiz-title" style={{ fontSize: '2rem', marginTop: 0 }}>
        Welcome to the React Quiz!
      </h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        You will have 30 seconds to answer each of the 10 questions.
      </p>
      <button onClick={onStartQuiz} className="primary-btn" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;