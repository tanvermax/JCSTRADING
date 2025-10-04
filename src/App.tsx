import { Outlet } from "react-router"
import CommonLayout from "./components/layout/CommoneLayout"
import { ToastContainer} from 'react-toastify';
import { genarateRoutes } from "./utils/genarateRoutes";
import { adminSidebarItem } from "./routes/adminSideberitem";

function App() {


  console.log(genarateRoutes(adminSidebarItem))
  return (
    <CommonLayout>
      <ToastContainer />

      <Outlet />

    </CommonLayout>
  )
}

export default App
