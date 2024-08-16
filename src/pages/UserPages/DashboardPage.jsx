import { useState } from 'react';
import Heading from "../../components/UI/Heading";
import Dashboard from "../../features/Dashboard/Dashboard";
import UploadScoreModal from "./UploadScoreModel";

function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col lg:ml-8 px-6 bg-white pt-10 pb-16">
      <div className="">
        <Heading>Dashboard</Heading>
        <button 
          onClick={handleOpenModal}
          className="px-2 py-1 float-right ring-1 ring-black rounded hover:bg-black hover:text-white duration-300"
        >
          Upload My Score
        </button>
      </div>
      <Dashboard />
      <UploadScoreModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default DashboardPage;
