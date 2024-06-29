import React from 'react';
import { Action, QuestionType } from '../App';

const Question = ({
  question,
  dispatch,
  answer,
}: {
  question: QuestionType;
  dispatch: (value: Action) => void;
  answer: number | null;
}) => {
  const isAnswered = answer !== null;
  return (
    <div>
      <h4>{question.question}</h4>
      <div className='options'>
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${
              isAnswered && index === answer ? 'answer' : ''
            } ${
              isAnswered
                ? question.correctOption === index
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            key={option}
            disabled={isAnswered}
            onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
