import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
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
            {
                Component: DashbordLayout,
                path: "/admin",
                children: [
                    {
                        Component: Analytic,
                        path: "analytic"
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
            }
        ]
    }, {
        Component: AdminLayout,
        path: "/admin",

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