/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import useAxiuseSecure from "../../../Hooks/useAxiuseSecure";
import { useQuery } from "@tanstack/react-query";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props: {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// type Product = {
//   category: string;
//   quantity: number;
//   // other properties...
// };
export default function Apps() {
  const [axiosSecure] = useAxiuseSecure();
  const { data: products = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`allProduct`);
      return res.data;
    },
  });

  //   const categoryData = products.reduce(
  //     (result: Record<string, any>, product: Product) => {
  //       const { category, quantity } = product;
  //       if (!result[category]) {
  //         result[category] = { category, totalQuantity: 0 };
  //       }
  //       result[category].totalQuantity += quantity;
  //       return result;
  //     },
  //     {}
  //   );

  //   const categoryArray = Object.values(categoryData);
  return (
    <BarChart
      width={500}
      height={300}
      data={products}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar
        dataKey="price"
        fill="#8884d8"
        shape={<TriangleBar fill={""} x={0} y={0} width={0} height={0} />}
        label={{ position: "top" }}
      >
        {products.map((_entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
}

Apps.demoUrl = "https://codesandbox.io/s/bar-chart-with-customized-shape-dusth";
