import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const GoogleLoging = () => {
  const { googleLoge } = useAuth();
  const navigat = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleLoge()
      .then((result) => {
        const logdUser = result.user;
        console.log(logdUser);
        //    const collectUser = {
        //      name: logdUser.displayName,
        //      email: logdUser.email,
        //      photo: logdUser.photoURL,
        //    };
        //    fetch("http://localhost:5000/users", {
        //      method: "POST",
        //      headers: {
        //        "content-type": "application/json",
        //      },
        //      body: JSON.stringify(collectUser),
        //    })
        //      .then((res) => res.json())
        //      .then((data) => {
        //        if (data.insertedId) {
        //          toast.success("Signup successful");
        //          navigat(from, { replace: true });
        //        }
        //      });

        toast.success("Signup successful");
        navigat(from, { replace: true });
      })
      .catch((error: string) => {
        console.log(error);
      });
  };
  return (
    <div>
      {/* <div className="divider ">Login&SingUp With Social</div> */}
      <div className="w-full text-center my-4 flex gap-4 justify-center">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline btn-primary  "
        >
          <FaGoogle /> Google
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline btn-primary "
        >
          <FaGoogle /> Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLoging;
