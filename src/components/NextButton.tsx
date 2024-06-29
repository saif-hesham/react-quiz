import React from 'react';
import { Action } from '../App';

const NextButton = ({
  dispatch,
  index,
  numberOfQuestions,
}: {
  dispatch: (value: Action) => void;
  index: number;
  numberOfQuestions: number;
}) => {
  if (index < numberOfQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );
  }

  if (index === numberOfQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finishQuiz' })}
      >
        Finish
      </button>
    );
  }
  return null;
};

export default NextButton;
