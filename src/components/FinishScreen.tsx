import { Action } from '../App';

const FinishScreen = ({
  score,
  highScore,
  maxPossibleScore,
  dispatch,
}: {
  score: number;
  highScore: number;
  maxPossibleScore: number;
  dispatch: (value: Action) => void;

}) => {
  const percentage = (score / maxPossibleScore) * 100;

  return (
    <>
      <p className='result'>
        You scored <strong>{score}</strong> out of
        <strong> {maxPossibleScore}</strong> ({Math.ceil(percentage)})%
      </p>
      <p className='high-score'>High Score: {highScore} points</p>
      <button className="btn btn-ui" onClick={() => dispatch({type: 'restart'})}>Restart</button>
    </>
  );
};

export default FinishScreen;
