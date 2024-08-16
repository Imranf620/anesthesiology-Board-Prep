import Performance from "../../features/Performance/Performance";
import Heading from "../../components/UI/Heading";

const PerformancePage = () => {
  return (
    <div className="lg:ml-8 px-6 bg-white full-height">
      <div className="py-8">
        <Heading>Performance</Heading>
      </div>
      <Performance />
    </div>
  );
};

export default PerformancePage;
