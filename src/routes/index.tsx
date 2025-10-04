import App from "@/App";
// import AddProduct from "@/components/layout/AdminLayoute/AddProduct/AddProduct";
// import User from "@/components/layout/AdminLayoute/User";
import DashbordLayout from "@/components/layout/DashbordLayout";
import About from "@/pages/About";
// import Analytic from "@/pages/Admin/Analytic";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Veryfy from "@/pages/Veryfy";
import { genarateRoutes } from "@/utils/genarateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItem } from "./adminSideberitem";
import { userSidebarItem } from "./userSIdebarItem";


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
    }
    ,
    {
        Component: DashbordLayout,
        path: "/admin",
        children: [...genarateRoutes(adminSidebarItem)],
    },
    {
        Component: DashbordLayout,
        path: "/user",
        children: [...genarateRoutes(userSidebarItem)]
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