import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSubmitQuiz } from './useSubmitQuiz';
import { toast } from 'react-toastify';
import { useQuizContext } from '../../context/QuizContext';
import { HiX } from 'react-icons/hi';
import Button from '../../components/UI/Button';
import { useResumeQuiz } from './useResumeQuiz';
import { prepareResumeTest } from '../../utils/prepareResumeTest';

const QuizSubmit = ({ onCloseModal, onSave, isSaving }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { state, setQuiz } = useQuizContext();
  const { submitQuiz, isLoading: isSubmitting } = useSubmitQuiz();
  const { resumeQuiz, isLoading: isResuming } = useResumeQuiz();
  const isAllAnswered = state.questions.length === state.options.length;

  // hanlde submittin of the quiz
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
        toast.success(
          'Test successfully submitted, you will be redirected to result page in a while!',
          { autoClose: 3000 },
        );
        queryClient.invalidateQueries({ queryKey: ['user-results'] });
        const data = {
          username: localStorage.getItem('username'),
          userTestID: state.quiz.userTestID,
        };
        resumeQuiz(data, {
          onSuccess: _data => {
            const { data, url } = prepareResumeTest(_data, 'completed');

            setTimeout(() => {
              setQuiz(data);
              navigate(url);
            }, 2000);
          },
          onError: err => {
            toast.error(err.message);
          },
        });
      },
      onError: err => toast.error(err.message, { autoClose: false }),
    });
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[1.4rem] font-[600] text-primary-400">
          End & Review
        </h1>
        <HiX
          onClick={onCloseModal}
          className="cursor-pointer text-[1.2rem] hover:scale-110"
        />
      </div>
      <div className="my-6 flex flex-col gap-4 text-[0.9rem]">
        <p>Are you sure you would like to end this test?</p>
        {isAllAnswered && <p>You have 0 unanswered question(s).</p>}
        <p>
          You may also choose to save and close this test, and resume it at a
          later time.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          disabled={isSubmitting || isResuming || isSaving}
          isLoading={isSubmitting || isResuming}
          variant="dark"
          onClick={handleSubmit}
        >
          End & Review
        </Button>
        <Button
          disabled={isSubmitting || isResuming || isSaving}
          isLoading={isSaving}
          className="font-[500]"
          variant="outlined"
          onClick={onSave}
        >
          {isSaving ? 'Saving' : ' Save & Resume Later'}
        </Button>
      </div>
    </div>
  );
};

export default QuizSubmit;
