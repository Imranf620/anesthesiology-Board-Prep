import { HiX } from 'react-icons/hi';
import { useQuizContext } from '../../context/QuizContext';
import { useGetResults } from '../Dashboard/useGetResults';
import FullPageLoading from '../../components/UI/FullPageLoading';

const QuizSummary = ({ onCloseModal }) => {
  const { state } = useQuizContext();
  const { results, isLoading } = useGetResults();


  const test = results.find(tst => tst.UserTestID === state.quiz.userTestID);

  return isLoading ? (
    <FullPageLoading />
  ) : (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[1.3rem] font-[500] text-primary-400">
          Test Result
        </h1>
        <HiX className="cursor-pointer text-[1.3rem]" onClick={onCloseModal} />
      </div>
      <div className="h-36"></div>
      <div>
        <ul className="grid grid-cols-2 px-3">
          <li>Score: {test.Score}%</li>
          <li className="text-end">Questions: {test.Total}</li>
          <li>National Average: 85%</li>
          <li className="text-end">Correct: {test.Correct}</li>
          <li>Difference: 33%</li>
          <li className="text-end">Incorrect: {test.Wrong}</li>
        </ul>
      </div>
    </div>
  );
};

export default QuizSummary;
