import { Link } from "react-router-dom";
import usePament from "../../Hooks/usePament";

const PaymentHistory = () => {
  const [payHistory, refetch] = usePament();
  console.log(payHistory);
  refetch();
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Payment History</h1>

      <div className=" w-[100%] mx-auto overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-2xl "
              >
                product Name
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-2xl"
              >
                Order Date
              </th>

              <th scope="col" className="px-6 py-4 font-medium text-2xl ">
                <Link className="ml-28" to={"/payment"}>
                  Delivary
                </Link>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {payHistory ? (
              payHistory.map((py) => (
                <tr key={py._id} className="hover:bg-gray-50">
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="text-sm">
                      <div className="font-medium w-32 text-gray-700">
                        {/* TODO: nested maping */}
                        {/* {py.itemeName.map((n, index) => (
                          <h1 key={index}>{n}</h1>
                        ))} */}
                        {py.itemeName}
                      </div>
                    </div>
                  </th>

                  <td className="px-6 py-4 text-xl">{py.date}</td>

                  <td className="px-6 py-4">
                    <div className=" ml-32 cursor-pointer text-xl">
                      {py.status}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p>Loading payment history...</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
