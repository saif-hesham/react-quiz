import { useEffect } from 'react';
import { Action } from '../App';

const Timer = ({
  dispatch,
  remainingSecs,
}: {
  dispatch: (value: Action) => void;
  remainingSecs: number | null;
}) => {
  const mins = Math.floor((remainingSecs ?? 60) / 60);
  const secs = (remainingSecs ?? 60) % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  });
  return (
    <div className='timer'>
      {mins < 10 && 0}
      {mins}:
      {secs < 10 && 0}
      {secs}
    </div>
  );
};

export default Timer;
