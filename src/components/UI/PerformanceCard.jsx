import Chart from "../../features/Dashboard/PieChart"; // Update the path if needed

const PerformanceCard = ({
  title,
  obtained,
  overallTitle,
  overall,
  position,
  chart = false,
  detail = [],
}) => {
  // Process and prepare the data for the chart
  const prepareData = detail.map((entry, index) => ({
    name: entry.Date_Added,
    userScore: entry.Score,
    averageScore: overall, // Assuming overall is the SmartPrep Average
    timePoint: index + 1,
  }));

  return (
    <div className="px-5 flex flex-col py-3 border-l-4 border-green-500 rounded-md bg-slate-100 text-gray-500 text-[0.9rem]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p>{title}</p>
          <h3 className="text-[2rem] font-[600] text-black">{obtained}</h3>
        </div>
        <div>
          <p>SmartPrep Average</p>
          <h3 className="font-[500]">{overall}</h3>
        </div>
      </div>

      {chart && (
        <div className="w-full h-[15rem] mx-auto">
          <Chart data={prepareData} />
        </div>
      )}
      <p className="mt-auto">
        {position.split(" ").map((itm, i) => (
          <span className={i === 0 ? "font-[700] text-black" : ""} key={i}>
            {itm}
            {"  "}
          </span>
        ))}
      </p>
    </div>
  );
};

export default PerformanceCard;
