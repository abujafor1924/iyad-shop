import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

type Inputs = {
  name: string;
  quantity: number | any;
  price: number | any;
};

const UpdateProduct = () => {
  const product = useLoaderData();
  const { _id, name } = product;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  // Add product

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch(`http://localhost:5000/allProductUpdate/${_id}`, {
      method: "PATCH",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json();
      })
      .then(() => {
        toast.success("Update successful");
      });
    reset();
  };
  return (
    <div>
      <h1 className="text-2xl pt-24 font-bold pb-4 ">Update Product</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[1000px] py-4 px-4 bg-slate-200"
      >
        <div className=" my-4 mt-4">
          <h1 className="mt-1 my-4 mr-2 w-32">Parduct Name</h1>
          <input
            type="text"
            defaultValue={name}
            {...register("name", { required: true })}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.name && <span>This field is required</span>}
        </div>

        <div className=" my-4 mt-4">
          <h1 className="mt-1 my-4 mr-2 w-32">Quantity</h1>
          <input
            type="number"
            {...register("quantity", { required: true })}
            className="  block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.quantity && <span>This field is required</span>}
        </div>
        <div className=" my-4 mt-4">
          <h1 className="mt-1 my-4 mr-2 w-32">Price</h1>
          <input
            type="number"
            {...register("price", { required: true })}
            className="  block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.price && <span>This field is required</span>}
        </div>

        <input className="btn btn-info" type="submit" />
      </form>
    </div>
  );
};

export default UpdateProduct;
