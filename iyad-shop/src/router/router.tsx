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

import Favorite from "../page/Home/productmng/Favorite";
import CartProduct from "../page/routepage/CartProduct";
import Payment from "../page/Dashboard/Pyment/Payment";
import PaymentHistory from "../page/routepage/PaymentHistory";
import UserDesh from "../page/routepage/UserDesh";
import VewDetails from "../page/routepage/VewDetails";

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
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/vew/:id",
        element: <VewDetails />,
        loader: ({ params }) =>
          fetch(`https://iyad-shop-server.vercel.app/allProduct/${params.id}`),
      },
      {
        path: "/payment",
        element: <Payment />,
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
          fetch(`https://iyad-shop-server.vercel.app/allProduct/${params.id}`),
      },

      // CUSTOMER PANELL

      {
        path: "/dashboard/user",
        element: <UserDesh />,
      },
      {
        path: "/dashboard/cart",
        element: <CartProduct />,
      },
      {
        path: "/dashboard/payHistory",
        element: <PaymentHistory />,
      },
    ],
  },
]);
export default router;
