import App from "@/App";
import AddProduct from "@/components/layout/AdminLayoute/AddProduct/AddProduct";
import User from "@/components/layout/AdminLayoute/User";
import DashbordLayout from "@/components/layout/DashbordLayout";
import About from "@/pages/About";
import Analytic from "@/pages/Admin/Analytic";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Booking from "@/pages/User/Booking";
import Veryfy from "@/pages/Veryfy";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                path: "about",
                Component: About,
            }, {
                path: "/",
                Component: Home,
            },

        ]
    }, {
        Component: DashbordLayout,
        path: "/admin",
        children: [
            {
                Component: Analytic,
                path: "analytic"
            },
            {
                Component: AddProduct,
                path: "add-product"
            },
            {
                Component: User,
                path: "users"
            }
        ]
    },
    {
        Component: DashbordLayout,
        path: "/user",
        children: [
            {
                Component: Booking,
                path: "bookings"
            }
        ]
    },
    {
        Component: Login,
        path: "/login",
    },
    {
        Component: Register,
        path: "/register",
    },
    {
        Component: Veryfy,
        path: "/verify",
    }

])


export default router;