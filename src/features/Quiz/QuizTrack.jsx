import { useQuizContext } from "../../context/QuizContext";
import QuizNavigate from "./QuizNavigate";

const QuizTrack = () => {
  const { state } = useQuizContext();

  const questions = state.questions;

  return (
    <div className="flex flex-col gap-3">
      <div className="mt-5 flex justify-center">
        <img src="/logo-white.png" className="w-[150px]" />
      </div>

      <div>
        <h3 className="mt-6 text-center text-[1.7rem] font-[600]">
          Question Navigation
        </h3>
        <ul className="scrollbar mx-auto mt-4 flex h-[60dvh] w-[60%] flex-col gap-4 overflow-y-auto px-3">
          {questions.map((ques, i) => (
            <QuizNavigate key={i} index={i} ques={ques} state={state} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizTrack;
