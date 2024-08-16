import React, { useCallback, useEffect, useState } from 'react';
import Heading from '../../components/UI/Heading';
import { useQuizContext } from '../../context/QuizContext';
import QuizTimer from './QuizTimer';
import { useSubmitQuiz } from './useSubmitQuiz';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';
import QuizSummary from './QuizSummary';

const QuizHeadComponent = ({ takeQuiz }) => {
  const { state, clearQuizState, setTime } = useQuizContext();
  const { submitQuiz, isLoading } = useSubmitQuiz();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const quizName = state.quizName;

  const handleTimeChange = useCallback(
    t => {
      setTime(t);
    },
    [setTime],
  );

  // Hanlde test submission
  const handleSubmit = () => {
    const options = state.options;
    const userTestID = state.quiz.userTestID;
    const quizData = {
      username: localStorage.getItem('username'),
      userTestID,
      questionChoices: options,
    };
    submitQuiz(quizData, {
      onSuccess: () => {
        toast.success('Test successfully submitted!', { autoClose: 3000 });
        queryClient.invalidateQueries({ queryKey: ['user-results'] });
        navigate('/performance');
        clearQuizState();
      },
      onError: err => {
        toast.error(err.message, { autoClose: false });
      },
    });
  };

  return (
    <div className=" mx-3 flex flex-col gap-2">
      <Heading>{quizName.split(' ').slice(0, -1).join(' ')}</Heading>
      <div className="flex flex-wrap items-center gap-6 text-[1.2rem] text-gray-500">
        <h5 className="capitalize">{state.status}</h5>
        <div className="flex gap-2">
          <div className="font-[700]">Type |</div>
          <div>{state.testType}</div>
        </div>

        {/* Quiz summary */}
        {state.status === 'completed' && (
          <div className="ml-auto">
            <Modal>
              <Modal.Open id="summary">
                <Button variant="dark">View Summary</Button>
              </Modal.Open>
              <Modal.Window id="summary" closeOnOverlay>
                <QuizSummary />
              </Modal.Window>
            </Modal>
          </div>
        )}

        {/* Quiz Timer */}
        {state.status !== 'completed' &&
          state.testType.toLowerCase() === 'timed' &&
          takeQuiz !== false && (
            <div className="ml-auto text-[1.4rem]">
              <QuizTimer
                time={state.testTime}
                onTimeEnd={handleSubmit}
                isLoading={isLoading}
                onTimeChange={handleTimeChange}
              />
            </div>
          )}
      </div>
    </div>
  );
};

const QuizHead = React.memo(QuizHeadComponent);

export default QuizHead;
