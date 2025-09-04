function Results({ questions, userAnswers, onRestart }) {
  const score = userAnswers.reduce((acc, answer, index) => {
    if (answer === questions[index].correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="card">
      <h2 className="question-text" style={{ textAlign: 'center' }}>Quiz Complete!</h2>
      <p className="quiz-title" style={{ fontSize: '1.5rem', marginTop: 0 }}>
        You scored {score} / {questions.length}
      </p>

      <div className="results-summary">
        {questions.map((q, index) => (
          <div key={index} className="result-item">
            <p>{q.question}</p>
            <p className={`your-answer ${userAnswers[index] === q.correctAnswer ? 'correct' : 'incorrect'}`}>
              Your answer: {userAnswers[index] || "Not answered"}
            </p>
            {userAnswers[index] !== q.correctAnswer && (
              <p className="correct-answer-text">Correct answer: {q.correctAnswer}</p>
            )}
          </div>
        ))}
      </div>

      <div className="navigation-controls" style={{ justifyContent: 'center', marginTop: '2rem' }}>
        <button onClick={onRestart} className="primary-btn">
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

export default Results;