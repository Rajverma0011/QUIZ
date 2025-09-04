function QuestionCard({ question, options, onAnswerSelect, selectedAnswer }) {
  return (
    <div>
      <h2 className="question-text">{question}</h2>
      <div className="options-grid">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            className={`option-btn ${selectedAnswer === option ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;