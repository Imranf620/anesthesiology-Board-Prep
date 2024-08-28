import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const colors = ["#3c735b", "#74b17b"];

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timePoint" label={{ value: "Attempt", position: "insideBottom", offset: -5 }} />
        <YAxis label={{ value: "Score (%)", angle: -90, position: "insideLeft" }} />
        <Tooltip
          contentStyle={{ background: "#193832" }}
          itemStyle={{ color: "#fff" }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="userScore"
          stroke={colors[0]}
          name="Your Score"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="averageScore"
          stroke={colors[1]}
          name="SmartPrep Average"
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;