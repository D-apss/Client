import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./page/layout.jsx";
import LoginPage from "./page/login.jsx";
import Home from "./page/home.jsx";
import Register from "./page/register.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const CheckUser = () => {
    if (!localStorage.getItem('access_token')) {
        return redirect('/login')
    }
    return null
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: "home",
                element: <Home />
            },
        ],
        loader: CheckUser
    },
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "register",
        element: <Register />
    },
]
)

export default router