import PerformanceTable from "./PerformanceTable";
import { useGetResults } from "../Dashboard/useGetResults";



const Performance = () => {
  const { results, isLoading } = useGetResults();
  return (
    <PerformanceTable
      dashboard={false}
      results={results}
      isLoading={isLoading}
      admin={false}
    />
  );
};

export default Performance;
