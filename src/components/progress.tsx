import React from 'react';

const Progress = ({
  index,
  numberOfQuestions,
  score,
  totalPoints,
  answer,
}: {
  index: number;
  numberOfQuestions: number;
  score: number;
  totalPoints: number;
  answer: number | null;
}) => {
  return (
    <header className='progress'>
      <progress value={index + (answer !== null ? 1 : 0)} max={numberOfQuestions} />
      <p>
        Question <strong>{index + 1}</strong> of
        <strong> {numberOfQuestions}</strong>
      </p>
      <p>
        <strong>{score}</strong>/ <strong>{totalPoints}</strong>
      </p>
    </header>
  );
};

export default Progress;
