import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const colors = ["#3c735b", "#74b17b", "#aae5b8", "#2f4e47"];

const Chart = ({ data }) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{ background: "#193832" }}
          itemStyle={{ color: "#fff" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
