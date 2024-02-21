import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./page/Layout.jsx";
import LoginPage from "./page/Login.jsx";
import Home from "./page/Home.jsx";
import Register from "./page/Register.jsx";
import BidPage from "./page/BidPage.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const CheckUser = () => {
  if (!localStorage.getItem("access_token")) {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bid/:id",
        element: <BidPage />,
      },
    ],
    loader: CheckUser,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
