import Button from "../../../components/UI/Button";
import Heading from "../../../components/UI/Heading";
import QuestionSearch from "../../QuestionSearch/QuestionSearch";

const ManageDatabase = () => {
  return (
    <div className="px-4 py-2 md:px-10 md:py-5">
      <div className="flex items-center justify-between">
        <Heading>Manage Database</Heading>
        {/* Link to add question page */}
        <Button variant="dark" link={true} to="add-question">
          Add Question
        </Button>
      </div>
      {/* Questions Search section */}
      <QuestionSearch admin={true} />
      <div className="flex justify-end px-3 py-5">
        <Button variant="dark" link={true} to="add-question">
          Add Question
        </Button>
      </div>
    </div>
  );
};

export default ManageDatabase;
