import { Outlet } from "react-router"
import CommonLayout from "./components/layout/CommoneLayout"
import { ToastContainer} from 'react-toastify';

function App() {

  return (
    <CommonLayout>
      <ToastContainer />

      <Outlet />

    </CommonLayout>
  )
}

export default App
