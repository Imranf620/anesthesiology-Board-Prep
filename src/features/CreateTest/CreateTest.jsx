import Button from "../../components/UI/Button";
import CreateQuickTestForm from "./CreateQuickTestForm";

const CreateTest = () => {
  return (
    <>
      <div className="flex flex-wrap gap-x-3 gap-y-5 justify-between px-4 border-b-2 border-gray-200 py-5 items-center">
        <h4 className="font-[500] text-[1.8rem] w-max">Create New Test</h4>
        <div className="flex items-center gap-3">
          <Button variant="outlined" className="text-[1rem]">
            Cancel
          </Button>
          <Button variant="dark" className="text-[1rem]">
            Start Test
          </Button>
        </div>
      </div>
      {/* Create Test Form */}
      <CreateQuickTestForm formClasses="flex flex-col gap-5 w-[500px] mx-auto border-2 mt-5 px-10 py-5 rounded" />
    </>
  );
};

export default CreateTest;
