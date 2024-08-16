import Heading from "../../../components/UI/Heading";

import Button from "../../../components/UI/Button";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import QuestionForm from "./QuestionForm";

const AddQuestion = () => {
  const navigate = useNavigate();
  return (
    <section className="px-4 py-2 md:px-10 md:py-5">
      <div>
        {/* Go Back Button */}
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
        <Heading className="py-4">Add Question</Heading>
        <div className="mb-4 sm:mb-0">
          {/* Link to Add questions from file */}
          <Button
            link={true}
            to="/admin/manage-database/add-file"
            className="text-[0.9rem]"
            variant="dark"
          >
            Upload Questions from file
          </Button>
        </div>
      </div>
      {/* Question form */}
      <QuestionForm />
    </section>
  );
};

export default AddQuestion;
