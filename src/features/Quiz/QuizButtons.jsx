import { HiMiniArrowRight, HiMiniArrowLeft } from 'react-icons/hi2';

import Button from '../../components/UI/Button';
import { useSearchParams } from 'react-router-dom';
import { useQuizContext } from '../../context/QuizContext';
import QuestionExplanation from './QuestionExplanation';
import { useEffect, useState } from 'react';

import { useSaveQuiz } from './useSaveQuiz';
import { toast } from 'react-toastify';
import Modal from '../../components/UI/Modal';
import QuizSubmit from './QuizSubmit';

const QuizButtons = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, setOptionSubmitted } = useQuizContext();

  const { saveQuiz, isLoading: isSaving } = useSaveQuiz();

  const questionOrder = +searchParams.get('questionOrder');
  const questionId = +searchParams.get('questionId');

  // Check if option is selected for the question
  const isOptionSelected = state.options.find(
    opt => opt.questionId === questionId && opt.option,
  );

  // function to navigate through buttons
  const handleNavigate = (next = true) => {
    if (next) {
      if (questionOrder === state.questions.length - 1) return;
      searchParams.set('questionOrder', questionOrder + 1);
    } else {
      if (questionOrder === 0) return;
      searchParams.set('questionOrder', questionOrder - 1);
    }

    return setSearchParams(searchParams);
  };

  // Set the submitted to true
  const handleExplainQuestion = () => {
    setOptionSubmitted(questionId);
    setShowExplanation(true);
  };

  // handle save quiz
  const handleSave = () => {
    const options = state.options;
    const userTestID = state.quiz.userTestID;
    const quizData = {
      username: localStorage.getItem('username'),
      userTestID,
      questionChoices: options,
    };

    if (state.testType.toLowerCase() === 'timed') {
      quizData.testTime = state.testTime;
    }

    saveQuiz(quizData, {
      onSuccess: () => {
        toast.success('Test successfully saved!', { autoClose: 4000 });
      },
      onError: err => {
        toast.error(err.message, { autoClose: false });
      },
    });
  };

  // To reset the state for new question
  // If test is only showing the result open explanation by default else don't show it
  useEffect(() => {
    if (state.status === 'completed') {
      return setShowExplanation(true);
    }
    return setShowExplanation(false);
  }, [questionOrder, state.status]);

  return (
    <>
      <section className="mt-8 px-8">
        <div
          className="flex flex-wrap items-center justify-between
         gap-x-2 gap-y-3"
        >
          {/* Explanation Button */}
          <div className="flex items-center gap-3">
            {(state.testType.toLowerCase() === 'tutor' ||
              state?.status?.toLowerCase() === 'completed') && (
              <Button
                disabled={!isOptionSelected}
                variant="outlined"
                onClick={handleExplainQuestion}
              >
                Explanation
              </Button>
            )}
          </div>
          <div className="ml-auto flex items-center gap-5">
            {/* Prev Button */}
            <Button
              disabled={questionOrder === 0}
              variant="outlined"
              onClick={() => handleNavigate(false)}
            >
              <HiMiniArrowLeft />
            </Button>
            {/* Next Button */}
            <Button
              disabled={questionOrder === state.questions.length - 1}
              variant="outlined"
              onClick={() => handleNavigate(true)}
            >
              <HiMiniArrowRight />
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-4">
            {state.status !== 'completed' && (
              <div className="ml-auto flex">
                <Button
                  disabled={isSaving}
                  onClick={handleSave}
                  variant="dark"
                  className="ml-auto"
                  isLoading={isSaving}
                >
                  Save
                </Button>
              </div>
            )}
            {/* Submit */}
            {state.status !== 'completed' &&
              !state.options.some(opt => opt.option === '' || !opt.option) &&
              state.options.length === state.questions.length && (
                <Modal>
                  <Modal.Open id="test-submit">
                    <Button type="button" variant="outlined">
                      Submit
                    </Button>
                  </Modal.Open>
                  <Modal.Window center id="test-submit" closeOnOverlay>
                    <QuizSubmit onSave={handleSave} isSaving={isSaving} />
                  </Modal.Window>
                </Modal>
              )}
          </div>
        </div>
      </section>
      {/* Question Explanation section */}
      {showExplanation && (
        <QuestionExplanation setShowExplanation={setShowExplanation} />
      )}
    </>
  );
};

export default QuizButtons;
