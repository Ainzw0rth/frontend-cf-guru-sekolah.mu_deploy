import { Outlet } from "react-router-dom"
import AppHead from "../components/AppHead"
import BottomNav from "../components/BottomNav"

const RootLayout = () => { 
    return (
        <>
            <AppHead/>
            <Outlet/>
            <BottomNav/>
        </>
    )
}

export default RootLayout;