import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addUpdateRateQuestion } from '../../services/apiQuestions';

// Inside your QuizQuestion component


import Heading from "../../components/UI/Heading";
import { useQuizContext } from "../../context/QuizContext";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { CiCalculator1 } from "react-icons/ci";
import { TbNotes, TbThumbDown, TbThumbUp } from "react-icons/tb";
import { FiMessageCircle } from "react-icons/fi";
import { toast } from "react-toastify";
const QuizQuestion = ({toggleSide}) => {
  const [searchParams] = useSearchParams();
  const [activeOption, setActiveOption] = useState(null);
  const [optionSubmitted, setOptionSubmited] = useState(false);
  const [questionMarked, setQuestionMarked] = useState(false);
  const { state, setOptions, markQuestion } = useQuizContext();
  const activeQuestion = +searchParams.get("questionId");
  // Take out the question
  const question = state.questions.find(
    (ques) => ques.QuestionID === activeQuestion
  );

  const [selectedRating, setSelectedRating] = useState(null);

 

  
  

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`${question.Chapter} / QuestionId - ${question.QuestionID}`).then(() => {
      toast.success('Question ID copied to clipboard!');
    }).catch(err => {
      toast.warn('Could not copy text: ', err);
    });
  }

  const handleThumbClick = async (rating) => {
    try {
      const ratingStatus = rating === 'up' ? 'Y' : 'N';
      await addUpdateRateQuestion(question?.QuestionID, ratingStatus);
      setSelectedRating(rating);
      toast.success('Rating submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit rating. Please try again.');
    }
  };
  
  // Handle the change of the options
  const handleChange = (e) => {
    setActiveOption(e.target.value);
    setOptions({
      option: e.target.value,
      questionId: activeQuestion,
      correct: question.Correct,
    });
  };

  // Handle mark question
  const handleMarkChange = (e) => {
    setQuestionMarked(e.target.checked);
    markQuestion(
      question.QuestionID,
      e.target.checked ? "Y" : "N",
      question.Correct
    );
  };

  // Look if the option is selected and also submitted or not
  useEffect(() => {
    const optExists = state.options.find(
      (opt) => opt.questionId === activeQuestion
    );
    setOptionSubmited(optExists?.submitted);
    setActiveOption(optExists?.option);
    setQuestionMarked(optExists?.markStatus === "Y");
  }, [activeQuestion, state.options]);

  return (
    <section className=" mt-2 rounded-lg border-2 border-gray-500 shadow-md  bg-white">
      <div className="p-2 md:p-5 text-center lg:p-12 flex flex-col gap-3">
        {state?.status?.toLowerCase() !== "completed" && (
          <div
            className={`flex justify-between gap-2 items-center ${
              !activeOption ? " opacity-60" : "" //!activeOption ? "cursor-not-allowed opacity-60" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="bg-[#fff] hover:bg-gray-300 cursor-pointer duration-300 ring-1 ring-black rounded p-1">
              <FaRegBookmark title="Bookmark" color="black"/>
              </div>
              <div className="bg-[#fff] cursor-pointer hover:bg-gray-300 duration-300 ring-1 ring-black rounded p-1">
              <FaRegCopy onClick={()=>handleCopyClick()} title="Copy Question Id" />
              </div>
            </div>
            <div className="flex items-center gap-2">
            <div className="bg-[#fff] cursor-pointer hover:bg-gray-300 duration-300 ring-1 ring-black rounded p-1">
              <CiCalculator1 title="Calculator" onClick={()=>toggleSide("cal")} color="black"/>
              </div>
              <div className="bg-[#fff] cursor-pointer hover:bg-gray-300 duration-300 ring-1 ring-black rounded p-1">
              <TbNotes color="black" title="Notes" onClick={()=>toggleSide("notes")} />
              </div>
              <div className="bg-[#fff] cursor-pointer hover:bg-gray-300 duration-300 ring-1 ring-black rounded p-1">
              <FiMessageCircle title="Feedback" onClick={()=>toggleSide("feedback")} />
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
          <h4 className="text-[1rem] md:text-[1.1rem] text-start mt-5 font-[500]">
            {question?.Statement}
          </h4>
          <div className="mt-6 ml-4 md:ml-14 text-[0.9rem] lg:text-[1.3rem]">
            {/* Options Container */}
            <ul className="flex flex-col gap-3">
              {question?.choices.map((choice) => (
                <li
                  key={choice.OptionName}
                  className={`flex gap-2 md:gap-5 items-start ${
                    choice.OptionStatement.length > 50
                      ? "items-start"
                      : "items-center"
                  }`}
                >
                  <div className="w-[1rem] h-[1rem] sm:w-[1.2rem] sm:h-[1.2rem] flex items-center justify-center">
                    <input
                      className={`accent-primary-400 outline-none w-[1rem] h-[1rem] sm:w-[1.2rem] sm:h-[1.2rem] cursor-pointer disabled:cursor-not-allowed `}
                      type="radio"
                      value={choice.OptionName}
                      onChange={handleChange}
                      checked={activeOption === choice.OptionName}
                      disabled={optionSubmitted || state.status === "completed"}
                    />
                  </div>
                  <label
                    className={`flex items-start text-start gap-1 sm:gap-2 md:gap-3 text-[0.8rem] lg:text-[1rem]`}
                  >
                    <span>{choice.OptionName}</span>{" "}
                    <span>{choice.OptionStatement}</span>

                  </label>
                </li>
              ))}

            </ul>
          </div>
        </div>
      </div>
      {state?.status?.toLowerCase() === "completed" && (
  <div className="flex items-center gap-4 p-4 px-12">
    <div
      className={`text-2xl rounded ring-1 p-1 ring-black cursor-pointer ${
        selectedRating === 'up' ? 'text-blue-600 bg-blue-100' : 'bg-gray-100 text-gray-800'
      }`}
      onClick={() => handleThumbClick('up')}
    >
      <TbThumbUp />
    </div>
    <div
      className={`text-2xl rounded ring-1 p-1 ring-black cursor-pointer ${
        selectedRating === 'down' ? 'text-blue-600 bg-blue-100' : 'bg-gray-100 text-gray-800'
      }`}
      onClick={() => handleThumbClick('down')}
    >
      <TbThumbDown />
    </div>
    <h1 className="text-lg font-medium text-gray-800">Rate this question</h1>
  </div>
)}

    </section>
  );
};

export default QuizQuestion;
