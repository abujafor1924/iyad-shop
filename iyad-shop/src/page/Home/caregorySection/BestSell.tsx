// import { useQuery } from "@tanstack/react-query";
// import useAxiuseSecure from "../../../Hooks/useAxiuseSecure";

// const BestSell = () => {
//   const [axiosSecure] = useAxiuseSecure();
//   const { data: category = [] } = useQuery({
//     queryFn: async () => {
//       const res = await axiosSecure.get(`allProduct`);
//       return res.data;
//     },
//   });
//   return (
//     <div>
//       {category.map((p) => (
//         <div>
//           <h1>{p.name}</h1>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BestSell;
