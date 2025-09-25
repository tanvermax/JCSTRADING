import { Outlet } from "react-router"
import CommonLayout from "./components/layout/CommoneLayout"
import { Toaster } from "sonner"


function App() {

  return (
    <CommonLayout>

      <Outlet />
      <Toaster />

    </CommonLayout>
  )
}

export default App
