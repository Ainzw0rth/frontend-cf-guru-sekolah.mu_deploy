import { Outlet } from "react-router-dom"
import AppHead from "../components/AppHead"
import BottomNav from "../components/BottomNav"

const RootLayout = () => { 
    return (
        <>
            <AppHead/>
            <div className="max-w-5xl m-auto">
                <Outlet/>
            </div>
            <BottomNav/>
        </>
    )
}

export default RootLayout;