import Heading from "../../../components/UI/Heading";
import Button from "../../../components/UI/Button";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import QuestionForm from "./QuestionForm";
import { useGetAllQuestions } from "../../QuestionSearch/useGetAllQuestions";
import FullPageLoading from "../../../components/UI/FullPageLoading";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

const EditQuestion = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const { allQuestions, isLoading } = useGetAllQuestions();
  const question = allQuestions?.questions?.find(
    (ques) => ques.id === +questionId,
  );

  return (
    <section className="px-4 py-2 md:px-10 md:py-5">
      <div>
        {/* Go Back button */}
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3"
          variant="underline"
        >
          <HiArrowLeft />
          <span>Go Back</span>
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Heading className="py-4">Edit Question</Heading>
      </div>
      {/* If not all question are loaded show spinner else show question form with the question */}
      {!allQuestions ? (
        <div>
          {" "}
          <LoadingSpinner />{" "}
        </div>
      ) : (
        <QuestionForm question={question} edit={true} />
      )}
    </section>
  );
};

export default EditQuestion;
