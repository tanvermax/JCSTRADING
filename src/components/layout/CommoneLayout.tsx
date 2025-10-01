import type { ReactNode } from "react";
import Footer from "./Footer";
import Navber from "./Navber";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";


interface IProps {
    children: ReactNode;
}


export default function CommonLayout({ children }: IProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navber />
            <div className="grow-1">
                      <ToastContainer />
                
                {children}
                <Toaster />
            </div>

            <Footer />

        </div>
    )
}