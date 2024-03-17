import { Outlet } from "react-router-dom"
import AppHead from "../components/AppHead"
import BottomNav from "../components/BottomNav"

const RootLayout = () => { 
    return (
    <>
        <div className="flex justify-center">
            <AppHead />
        </div>
        <div className="max-w-screen-sm mx-auto">
            <Outlet />
        </div>
        <div className="flex justify-center">
            <BottomNav />
        </div>
    </>
    )
}

export default RootLayout;