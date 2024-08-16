import Heading from "../../components/UI/Heading";
import CreateQuickTestForm from "./CreateQuickTestForm";

const CreateQuickTest = ({ onCloseSidebar }) => {
  return (
    <div className="h-full px-3 flex gap-5 flex-col items-center">
      <div className="mt-5 flex">
        <img src="/logo-white.png" className="h-[100px]" />
      </div>
      <Heading className="font-[700] capitalize">Quick quiz</Heading>
      {/* Quick Test Form */}
      <CreateQuickTestForm onCloseSidebar={onCloseSidebar} quickTest={true} />
    </div>
  );
};

export default CreateQuickTest;
