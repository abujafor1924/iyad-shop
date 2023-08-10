import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Error from "../page/Error/Error";
import Home from "../page/Home/Home";

import Registretion from "../page/Login&registretion/Registretion";
import Login from "../page/Login&registretion/Login";
import Test from "../page/Error/Test";
import ProtectiveRoute from "./ProtectiveRoute";

import Category from "../page/Dashboard/product/Category/Category";

import Analytix from "../page/Dashboard/Analytix";
import AddProduct from "../page/Dashboard/product/AddProduct";
import Header from "../page/Dashboard/website/Header";
import Footer from "../page/Dashboard/website/Footer";
import Pages from "../page/Dashboard/website/Pages";
import Appearence from "../page/Dashboard/website/Appearence";
import MackAdmin from "../page/Dashboard/website/MackAdmin";

import Dashboard from "../LayOut/Dashboard";
import AllProduct from "../page/Dashboard/product/AllProduct";
import AddCategory from "../page/Dashboard/product/Category/AddCategory";
import UpdateProduct from "../page/Dashboard/product/UpdateProduct";

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
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: "/dashboard/admin",
        element: <Analytix />,
      },
      {
        path: "/dashboard/category",
        element: <Category />,
      },
      {
        path: "/dashboard/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/header",
        element: <Header />,
      },
      {
        path: "/dashboard/footer",
        element: <Footer />,
      },
      {
        path: "/dashboard/pages",
        element: <Pages />,
      },
      {
        path: "/dashboard/appearence",
        element: <Appearence />,
      },
      {
        path: "/dashboard/mackadmin",
        element: <MackAdmin />,
      },
      {
        path: "/dashboard/allproduct",
        element: <AllProduct />,
      },
      {
        path: "/dashboard/addcategory",
        element: <AddCategory />,
      },
      {
        path: "/dashboard/update/:id",
        element: <UpdateProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allProduct/${params.id}`),
      },
    ],
  },
]);
export default router;
