import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const colors = ["#3c735b", "#74b17b", "#aae5b8", "#2f4e47"];

const Chart = ({ data }) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{ background: "#193832" }}
          itemStyle={{ color: "#fff" }}
        />
        <Line type="monotone" dataKey="value" stroke={colors[0]} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
