import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import QuizHead from './QuizHead';
import QuizQuestion from './QuizQuestion';
import QuizButtons from './QuizButtons';
import { useQuizContext } from '../../context/QuizContext';
import { useSaveQuiz } from './useSaveQuiz';
import Side from './Side.jsx';
import { FaArrowRight } from 'react-icons/fa6';

const Quiz = ({ takeQuiz }) => {
  const { state } = useQuizContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { saveQuiz } = useSaveQuiz();
  const questionOrder = +searchParams.get('questionOrder');

  // Set url of quiz page
  useEffect(() => {
    const question = state.questions.find((_, i) => i === questionOrder);
    searchParams.set('questionId', question?.QuestionID);
    setSearchParams(searchParams);
  }, [questionOrder, state.questions, searchParams, setSearchParams]);
  

  // When go out from test page save the result of the test
  useEffect(() => {
    const handleSave = () => {
      if (state.status === 'completed') return;
      const options = state.options;
      const userTestID = state.quiz?.userTestID;
      const quizData = {
        username: localStorage.getItem('username'),
        userTestID,
        questionChoices: options,
      };

      if (state.testType.toLowerCase() === 'timed') {
        quizData.testTime = state.testTime;
      }
      
      
      saveQuiz(quizData);
      
    };
    return () => handleSave();
  }, [
    state.options,
    state.quiz?.userTestID,
    state.testType,
    state.testTime,
    saveQuiz,
  ]);

  const [side, setSide] = useState();
  const [showSide, setShowSide] = useState(false);
  const toggleSide = btn => {
    if (btn === 'cal') {
      setSide('cal');
      if (side === 'cal') {
        setShowSide(false);
      }
    } else if (btn === 'notes') {
      setSide('notes');
      if (side === 'notes') {
        setShowSide(false);
      }
    } else {
      setSide('feedback');
      if (side === 'feedback') {
        setShowSide(false);
      }
    }
    if (showSide !== true) {
      setShowSide(true);
    }
  };


  return (
    <div className="flex h-full">
      <div className="mx-3 flex w-full flex-col pb-12 lg:mx-8">
        <QuizHead takeQuiz={takeQuiz} />
        <QuizQuestion toggleSide={toggleSide} userTestID={state.quiz?.userTestID} />
        <QuizButtons />
      </div>
      <div
        className={`${showSide ? 'block ' : 'hidden'} absolute w-full h-full md:relative  md:w-1/2  bg-white px-4 duration-300`}
      >
        <FaArrowRight
          onClick={() => setShowSide(false)}
          className={`absolute ${showSide === true ? '' : 'hidden'}  left-0 top-12 md:-left-4 md:top-16 rounded-full bg-gray-200 p-2 text-3xl ring-1 ring-black`}
        />
        <Side side={side} Topic={state.questions[questionOrder]?.Topic} questionID={state.questions[questionOrder]?.QuestionID} userTestID={state.quiz?.userTestID} />

      </div>
    </div>
  );
};

export default Quiz;
