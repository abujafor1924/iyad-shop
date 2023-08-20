import { useForm, SubmitHandler } from "react-hook-form";
import useAxiuseSecure from "../../../Hooks/useAxiuseSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

type Inputs = {
  name: string;
  description: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quantity: string | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  price: string | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: File | any;
  recipe: string;
  date: string[] | undefined;
};

interface Category {
  _id: string;
  categories: string;
}
const image_hoisting_token = import.meta.env.VITE_image_uplode_token;

const AddProduct = () => {
  const [axiosSecure] = useAxiuseSecure();
  const imge_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hoisting_token}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { data: category = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`allCategory`);
      return res.data;
    },
  });

  // Add product

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(imge_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { name, price, category, quantity, description } = data;
          const newItem = {
            name,
            price: parseFloat(price),
            category,
            description,
            quantity: parseInt(quantity),
            image: imgURL,
          };
          console.log(newItem);
          axiosSecure.post("/addProduct", newItem).then((data) => {
            console.log("after posting new product", data.data);
            if (data.data.insertedId) {
              reset();
              toast.success("Add product successful");
            }
          });
        }
      });
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  return (
    <div>
      <h1 className="text-2xl pt-24 font-bold pb-4 ">Add Product</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[1000px] py-4 px-4 bg-slate-200"
      >
        <div className=" my-4 mt-4">
          <h1 className="mt-1 my-4 mr-2 w-32">Parduct Name</h1>
          <input
            type="text"
            {...register("name", { required: true })}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.name && <span>This field is required</span>}
        </div>
        <div className="my-4  mt-4">
          <h1 className="mt-1 mr-2 w-32 my-4">Category</h1>
          <select
            id="countries"
            {...register("category")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""}>Choose a Category</option>
            {category.map((cd: Category) => (
              <option key={cd._id} value={cd.categories}>
                {cd.categories}
              </option>
            ))}
          </select>
          {errors.category && <span>This field is required</span>}
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
        <div className=" my-4 mt-4">
          <h1 className="mt-1 my-4 mr-2 w-32">Date</h1>
          <input
            type="text"
            value={formattedDate}
            {...register("date", { required: true })}
            className="  block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.date && <span>This field is required</span>}
        </div>
        <div className=" my-4 mt-4">
          <h1 className="mt-1 my-4 mr-2 w-32">Image</h1>
          <div>
            <input
              type="file"
              placeholder="You can't touch this"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full max-w-xs"
            />
            {errors.image && <span>This field is required</span>}
          </div>
        </div>
        <div className=" my-4 mt-4">
          <h1 className="mt-1 my-4 mr-2 w-32">Description</h1>
          <input
            type="text"
            {...register("description", { required: true })}
            className="  block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.description && <span>This field is required</span>}
        </div>
        <input className="btn btn-info" type="submit" />
      </form>
    </div>
  );
};

export default AddProduct;
