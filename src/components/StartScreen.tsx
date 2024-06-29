import React from 'react';
import { Action } from '../App';

const StartScreen = ({
  numberOfQuestions,
  dispatch,
}: {
  numberOfQuestions: number;
  dispatch: (value: Action) => void;
}) => {
  return (
    <div className='start'>
      <h2>Welcome to React Quiz.</h2>
      <h3>{numberOfQuestions} questions to test your React mastery.</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'start' })}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
