import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Loader from './components/Loader';
import Main from './components/Main';
import ErrorComponent from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';

const SECS_PER_QUESTION = 30;

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type StateType = {
  questions: QuestionType[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finish';
  index: number;
  answer: number | null;
  score: number;
  highScore: number;
  remainingSecs: number | null;
};

const initialState: StateType = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  score: 0,
  highScore: 0,
  remainingSecs: null,
};

export type Action =
  | { type: 'dataReceived'; payload: QuestionType[] }
  | { type: 'newAnswer'; payload: number }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'nextQuestion' }
  | { type: 'finishQuiz' }
  | { type: 'restart' }
  | { type: 'tick' };

const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        remainingSecs: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === currentQuestion?.correctOption
            ? (state.score += currentQuestion.points)
            : state.score,
      };
    case 'nextQuestion':
      return { ...state, answer: null, index: state.index + 1 };
    case 'finishQuiz':
      return {
        ...state,
        status: 'finish',
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case 'restart':
      return { ...state, index: 0, answer: null, score: 0, status: 'ready' };
    case 'tick':
      return {
        ...state,
        index: 0,
        answer: null,
        score: 0,
        status: state.remainingSecs === 0 ? 'finish' : state.status,
        remainingSecs: (state.remainingSecs ?? 1) - 1,
      };
    default:
      throw new Error('Unknown action');
  }
};

const App = () => {
  const [
    { questions, status, index, answer, score, highScore, remainingSecs },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestion = questions.length;
  const totalPoints = questions.reduce(
    (acc, curValue) => acc + curValue.points,
    0
  );

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorComponent />}
        {status === 'ready' && (
          <StartScreen
            numberOfQuestions={numberOfQuestion}
            dispatch={dispatch}
          />
        )}
        {status === 'active' && (
          <>
            <Progress
              score={score}
              numberOfQuestions={numberOfQuestion}
              index={index}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} remainingSecs={remainingSecs} />
              {answer !== null && (
                <NextButton
                  dispatch={dispatch}
                  index={index}
                  numberOfQuestions={numberOfQuestion}
                />
              )}
            </footer>
          </>
        )}
        {status === 'finish' && (
          <FinishScreen
            maxPossibleScore={totalPoints}
            score={score}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
