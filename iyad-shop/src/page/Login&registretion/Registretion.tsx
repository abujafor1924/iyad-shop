/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import GoogleLoging from "../socialLogin/GoogleLoging";
type Inputs = {
  insertedId: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  name: string;
  email: string;
  password: string;
};
const image_hoisting_token = import.meta.env.VITE_image_uplode_token;
const Registretion = () => {
  const imge_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hoisting_token}`;
  const { createUser, updateUser } = useAuth();
  const [show, setShow] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigat = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imge_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((photos) => {
        console.log(photos);
        if (photos.success) {
          const imgUrl = photos.data.display_url;
          console.log(imgUrl);
          createUser(data.email, data.password)
            .then((result) => {
              const logdUser = result.user;
              console.log(logdUser);
              updateUser(data.name, imgUrl)
                .then(() => {
                  // const collectUser = {
                  //   name: data.name,
                  //   email: data.email,
                  //   photo: imgUrl,
                  // };
                  // fetch("http://localhost:5000/users", {
                  //   method: "POST",
                  //   headers: {
                  //     "content-type": "application/json",
                  //   },
                  //   body: JSON.stringify(collectUser),
                  // })
                  //   .then((res) => res.json())
                  //   .then((data) => {
                  //     console.log(data);
                  //   });
                  if (data.insertedId) {
                    toast.success("Signup successful");
                    navigat(from, { replace: true });
                  }
                })
                .catch((error: string) => console.log(error));
            })
            .catch((error) => console.log(error));
        }
      });
    reset();
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                autoComplete="name"
                {...register("name", { required: true })}
                className="  text-center  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.name && <span>This field is required</span>}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                autoComplete="email"
                {...register("email", { required: true })}
                className=" text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <span>This field is required</span>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="profile"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile
              </label>
            </div>
            <div className="mt-2">
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input file-input-bordered w-full max-w-lg"
              />
              {errors.image && <span>This field is required</span>}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                type={show ? "text" : "password"}
                autoComplete="current-password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])/,
                })}
                className="  text-center  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">is less than 6 characters</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  don,t have a capital letter and don,t have a special character
                </p>
              )}
              <p
                className="absolute right-3 top-2 text-2xl"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <span>
                    {" "}
                    <FaEyeSlash />
                  </span>
                ) : (
                  <span>
                    {" "}
                    <FaEye />
                  </span>
                )}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div>
          <p className="m-2">
            have a account?{" "}
            <Link to={"/login"} className="text-red-700">
              SING IN
            </Link>
          </p>
          <GoogleLoging />
        </div>
      </div>
    </div>
  );
};

export default Registretion;
