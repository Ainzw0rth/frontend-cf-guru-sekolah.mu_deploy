import { Outlet } from "react-router-dom"
import AppHead from "../components/AppHead"
import BottomNav from "../components/BottomNav"
import React from "react";

const RootLayout = () => { 
    const scrollToRef = React.useRef<HTMLDivElement | null>(null);
    const scrollToTop = () => {
        if (scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
    <div ref={scrollToRef}>
        <div className="flex justify-center">
            <AppHead />
        </div>
        
        <div className="max-w-screen-sm mx-auto">
            <Outlet />
        </div>

        <div className="flex justify-center">
            <BottomNav scrollToTop={scrollToTop} />
        </div>
    </div>
    )
}

export default RootLayout;