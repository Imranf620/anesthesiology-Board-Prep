import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { addUpdateRateQuestion } from '../../services/apiQuestions';
import { createUpdateNote } from '../../services/apiNotes'; // Import your API function
import Heading from '../../components/UI/Heading';
import { useQuizContext } from '../../context/QuizContext';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { FaRegCopy } from 'react-icons/fa';
import { CiCalculator1 } from 'react-icons/ci';
import { TbNotes, TbThumbDown, TbThumbUp } from 'react-icons/tb';
import { FiMessageCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { QuizQuestionIconContext } from '../../context/QuizquestionIconStata';

const QuizQuestion = ({ toggleSide, userTestID, testType }) => {
  const { updateIconState, iconState } = useContext(QuizQuestionIconContext);
  const [searchParams] = useSearchParams();
  const [activeOption, setActiveOption] = useState(null);
  const [optionSubmitted, setOptionSubmited] = useState(false);
  const [questionMarked, setQuestionMarked] = useState(false);
  const { state, setOptions, markQuestion } = useQuizContext();
  console.log('state', state);
  const activeQuestion = +searchParams.get('questionId');
  const question = state.questions.find(
    ques => ques.QuestionID === activeQuestion,
  );
  const [selectedRating, setSelectedRating] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(`${question.Chapter} / QuestionId - ${question.QuestionID}`)
      .then(() => {
        toast.success('Question ID copied to clipboard!');
      })
      .catch(err => {
        toast.warn('Could not copy text: ', err);
      });
  };

  const handleThumbClick = async rating => {
    try {
      const ratingStatus = rating === 'up' ? 'Y' : 'N';
      await addUpdateRateQuestion(question?.QuestionID, ratingStatus);
      setSelectedRating(rating);
      toast.success('Rating submitted successfully!', { autoClose: 2000 });
    } catch (error) {
      toast.error('Failed to submit rating. Please try again.', {
        autoClose: 2000,
      });
    }
  };

  // Handle the change of the options
  const handleChange = e => {
    setActiveOption(e.target.value);
    setOptions({
      option: e.target.value,
      questionId: activeQuestion,
      correct: question.Correct,
    });
  };

  // Handle mark question
  const handleMarkChange = e => {
    setQuestionMarked(e.target.checked);
    markQuestion(
      question.QuestionID,
      e.target.checked ? 'Y' : 'N',
      question.Correct,
    );
  };

  const handleBookmarkClick = async () => {
    try {
      const bookmarkStatus = isBookmarked ? 'N' : 'Y'; // Toggle bookmark status
      const bookmarkData = {
        username: localStorage.getItem('username'),
        questionID: question.QuestionID,
        bookmarkStatus,
        userTestID,
        topic: question.Topic,
      };

      const res = await createUpdateNote(bookmarkData);
      setIsBookmarked(!isBookmarked); // Toggle local bookmark state

      // Show success message on adding or removing a bookmark
      if (!isBookmarked) {
        toast.success(res.data.Message, { autoClose: 2000 });
      } else {
        toast.info('Bookmark removed successfully!', { autoClose: 2000 });
      }

      updateIconState(!iconState);
    } catch (error) {
      // Handle errors and show toast notification
      toast.error('Failed to bookmark question. Please try again.');
    }
  };

  useEffect(() => {
    const optExists = state.options.find(
      opt => opt.questionId === activeQuestion,
    );
    setOptionSubmited(optExists?.submitted);
    setActiveOption(optExists?.option);
    setQuestionMarked(optExists?.markStatus === 'Y');
  }, [activeQuestion, state.options]);

  return (
    <section className="mt-2 rounded-lg border-2 border-gray-500 bg-white shadow-md">
      <div className="flex flex-col gap-3 p-2 text-center md:p-5 lg:p-12">
        {state?.status?.toLowerCase() !== 'completed' && (
          <div
            className={`flex items-center justify-between gap-2 ${!activeOption ? 'opacity-60' : ''}`}
          >
            <div className="flex items-center gap-2">
              <div
                className="tool relative cursor-pointer rounded bg-[#fff] p-1 ring-1 ring-black duration-300 hover:bg-gray-300"
                onClick={handleBookmarkClick}
              >
                {isBookmarked ? (
                  <FaBookmark color="#193832" size={20} /> // Filled bookmark when active
                ) : (
                  <FaRegBookmark color="#193832" size={20} /> // Regular bookmark when inactive
                )}
                <span className="tooltip">Bookmark</span>
              </div>

              <div className="tool relative cursor-pointer rounded bg-[#fff] p-1 ring-1 ring-black duration-300 hover:bg-gray-300">
                <FaRegCopy
                  color="#193832"
                  onClick={handleCopyClick}
                  size={20}
                />
                <span className="tooltip">Copy Question id</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="tool relative cursor-pointer rounded bg-[#fff] p-1 ring-1 ring-black duration-300 hover:bg-gray-300">
                <CiCalculator1
                  onClick={() => toggleSide('cal')}
                  color="#193832"
                  size={20}
                />
                <span className="tooltip">Calculator</span>
              </div>
              <div className="tool relative cursor-pointer rounded bg-[#fff] p-1 ring-1 ring-black duration-300 hover:bg-gray-300">
                <TbNotes
                  color="#193832"
                  onClick={() => toggleSide('notes')}
                  size={20}
                />
                <span className="tooltip">Notes</span>
              </div>
              <div className="tool relative cursor-pointer rounded bg-[#fff] p-1 ring-1 ring-black duration-300 hover:bg-gray-300">
                <FiMessageCircle
                  color="#193832"
                  size={20}
                  onClick={() => toggleSide('feedback')}
                />
                <span className="tooltip">Feedback</span>
              </div>
            </div>
            {/* <input
              name="Marked"
              id="marked"
              type="checkbox"
              disabled={!activeOption}
              checked={questionMarked}
              onChange={handleMarkChange}
              className="h-4 w-4 text-primary-300 transition duration-150 ease-in-out cursor-pointer accent-primary-300"
            />
            <label htmlFor="marked" className="cursor-pointer">
              Marked
            </label> */}
          </div>
        )}
        <Heading className="w-full">Question</Heading>
        <div>
          {/* Question */}
          <h4 className="mt-5 text-start text-[1rem] font-[500] md:text-[1.1rem]">
            {question?.Statement}
          </h4>
          <div className="ml-4 mt-6 text-[0.9rem] md:ml-14 lg:text-[1.3rem]">
            {/* Options Container */}
            <ul className="flex flex-col gap-3">
              {question?.choices.map(choice => (
                <li
                  key={choice.OptionName}
                  className={`flex items-start gap-2 md:gap-5 ${choice.OptionStatement.length > 50 ? 'items-start' : 'items-center'}`}
                >
                  <div className="flex h-[1rem] w-[1rem] items-center justify-center sm:h-[1.2rem] sm:w-[1.2rem]">
                    <input
                      className={`h-[1rem] w-[1rem] cursor-pointer accent-primary-400 outline-none disabled:cursor-not-allowed sm:h-[1.2rem] sm:w-[1.2rem] `}
                      type="radio"
                      value={choice.OptionName}
                      onChange={handleChange}
                      checked={activeOption === choice.OptionName}
                      disabled={optionSubmitted || state.status === 'completed'}
                    />
                  </div>
                  <label
                    className={`flex items-start gap-1 text-start text-[0.8rem] sm:gap-2 md:gap-3 lg:text-[1rem]`}
                  >
                    <span>{choice.OptionName}</span>{' '}
                    <span>{choice.OptionStatement}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {state?.status?.toLowerCase() === 'completed' && (
        <div className="flex items-center gap-4 p-4 px-12">
          <div
            className={`cursor-pointer rounded p-1 text-2xl ring-1 ring-black ${selectedRating === 'up' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-800'}`}
            onClick={() => handleThumbClick('up')}
          >
            <TbThumbUp />
          </div>
          <div
            className={`cursor-pointer rounded p-1 text-2xl ring-1 ring-black ${selectedRating === 'down' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-800'}`}
            onClick={() => handleThumbClick('down')}
          >
            <TbThumbDown />
          </div>
          <h1 className="text-lg font-medium text-gray-800">
            Rate this question
          </h1>
        </div>
      )}
    </section>
  );
};

export default QuizQuestion;
