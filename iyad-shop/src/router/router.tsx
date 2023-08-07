import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Error from "../page/Error/Error";
import Home from "../page/Home/Home";

import Registretion from "../page/Login&registretion/Registretion";
import Login from "../page/Login&registretion/Login";
import Test from "../page/Error/Test";
import ProtectiveRoute from "./ProtectiveRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registretion",
        element: <Registretion />,
      },
      {
        path: "/test",
        element: (
          <ProtectiveRoute>
            <Test />
          </ProtectiveRoute>
        ),
      },
    ],
  },
]);
export default router;
