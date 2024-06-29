import { useReducer } from 'react';

type Action =
  | { type: 'Increment' | 'Decrement' | 'Reset' }
  | { type: 'setCount' | 'setStep'; payload: number };

  
  
function DateCounter() {

  const initialState = { count: 0, step: 1 };

  const reducer = (state: { count: number; step: number }, action: Action) => {
    switch (action.type) {
      case 'Decrement':
        return { ...state, count: state.count - state.step };
      case 'Increment':
        return { ...state, count: state.count + state.step };
      case 'setCount':
        return { ...state, count: action.payload };
      case 'setStep':
        return { ...state, step: action.payload };
      case 'Reset':
        return initialState;
      default:
        throw new Error('Unknown action');
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  // const [step, setStep] = useState(1);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount(count => count - step);
    dispatch({ type: 'Decrement' });
  };

  const inc = function () {
    dispatch({ type: 'Increment' });
    // setCount((count) => count + 1);
    // setCount(count => count + step);
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    // setStep(Number(e.target.value));
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'Reset' });

    // setStep(1);
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
