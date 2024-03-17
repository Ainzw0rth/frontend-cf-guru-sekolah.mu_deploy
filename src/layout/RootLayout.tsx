import { Outlet } from "react-router-dom"
import AppHead from "../components/AppHead"
import BottomNav from "../components/BottomNav"

const RootLayout = () => { 
    return (
        <>
            <AppHead/>
            <div className="max-w-screen-sm mx-auto">
                <Outlet/>
            </div>
            <BottomNav/>
        </>
    )
}

export default RootLayout;