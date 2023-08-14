import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLoging from "../socialLogin/GoogleLoging";
type Inputs = {
  email: string;
  password: string;
};
const Login = () => {
  const { signIn } = useAuth();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<Inputs>();

  const navigat = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        const logdUser = res.user;
        console.log(logdUser);
        toast.success("Login succesfull");
        navigat(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
    reset();
  };
  return (
    <>
      <Helmet>
        <title>Login | Iyaad-shop</title>
      </Helmet>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            action="#"
            method="POST"
          >
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
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password", { required: true })}
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <span>This field is required</span>}
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
                Sign in
              </button>
            </div>
          </form>
          <div>
            <p className="m-2">
              have no account?{" "}
              <Link to={"/registretion"} className="text-red-700">
                SING UP
              </Link>
            </p>
            <GoogleLoging />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
