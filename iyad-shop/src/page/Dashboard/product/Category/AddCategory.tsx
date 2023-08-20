/* eslint-disable react-hooks/rules-of-hooks */
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

type Inputs = {
  categories: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insertedId: any;
};

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    fetch("https://iyad-shop-server.vercel.app/addCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        toast.success("Add Category successful");
      });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Category Name here"
        {...register("categories", { required: true })}
        className=" py-4 input input-bordered w-96 max-w-xs bg-black text-white text-xl font-medium"
      />
      {errors.categories && <span>This field is required</span>}

      <input className="btn btn-error mx-2 " type="submit" />
    </form>
  );
};

export default AddCategory;
