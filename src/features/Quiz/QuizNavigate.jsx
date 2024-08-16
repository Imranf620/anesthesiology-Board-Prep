import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const QuizNavigate = ({ ques, index, state }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const questionOrder = +searchParams.get("questionOrder");
  const ref = useRef();

  // Check if option is selected or not
  const isOptionSelected = state.options?.find(
    (opt) => opt.questionId === ques.QuestionID,
  );
  // Handle navigation
  const handleNavigation = (index) => {
    searchParams.set("questionOrder", index);
    setSearchParams(searchParams);
  };
  useEffect(() => {
    if (ref.current && questionOrder === index)
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [ref, questionOrder, index]);
  // style
  // If option is selected and submitted and is correct bg-green
  // If option is selected and submitted and not correct bg-red
  // If option is selected and not submitted bg-blue
  // If option is not selected bg-transparent
  const style =
    isOptionSelected &&
    isOptionSelected.submitted &&
    isOptionSelected.option === ques.Correct
      ? "bg-primary-200 border-none"
      : isOptionSelected &&
          isOptionSelected.submitted &&
          isOptionSelected?.option !== ques.Correct
        ? "bg-red-500 border-none"
        : isOptionSelected?.option
          ? "bg-blue-400 border-none"
          : "";

  return (
    <li
      key={ques.QuestionID}
      className={`flex items-center justify-between text-[1.3rem] `}
    >
      <button
        ref={ref}
        onClick={() => handleNavigation(index)}
        className={`h-[3rem] w-[3rem] rounded-full font-[600] hover:bg-gray-50/10 ${
          questionOrder === index ? "border-2 border-white" : ""
        }`}
      >
        {index + 1}
      </button>
      <div
        className={`h-[1.2rem] w-[1.2rem] rounded-full border-2 border-white ${style}`}
      ></div>
    </li>
  );
};

export default QuizNavigate;
