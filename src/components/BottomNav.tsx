import homeImg from '../assets/nav/home.png';
import programImg from '../assets/nav/program.png';
import scheduleImg from '../assets/nav/schedule.png';
import pendingTaskImg from '../assets/nav/pending.png';
import studentImg from '../assets/nav/profile.png';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface BottomNavItemProps {
    icon: string;
    url: string;
    alt?: string;
    onClick: () => void;
    active: boolean;
}

const BottomNavItem = (props: BottomNavItemProps) => {
    return (
        <li>
            <Link to={props.url} onClick={props.onClick}>
                <img 
                    src={props.icon} 
                    alt={props.alt ? props.alt : 'Nav Icon'} 
                    className={`h-12 p-1.5 ${props.active ? 'grayscale-0' : 'grayscale'}`}
                />
            </Link>
        </li>
    );
}

const NAV = {
    HOME: 0,
    PROGRAM: 1,
    SCHEDULE: 2,
    PENDING: 3,
    PROFILE: 4
}

const NAV_ORIGIN_URL = new Map([
    [NAV.HOME, '/'],
    [NAV.PROGRAM, '/program'],
    [NAV.SCHEDULE, '/schedule'],
    [NAV.PENDING, '/pending-task'],
    [NAV.PROFILE, '/profile']
]);

const BottomNav = () => {
    const [active, setActive] = useState(NAV.HOME);
    const [navItemsUrls, setNavItemsUrls] = useState(['/','/program','/schedule','/pending-task','/profile']);

    const location = useLocation();
    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setActive(NAV.HOME);
        } else if (path.startsWith('/program')) {
            setActive(NAV.PROGRAM);
        } else if (path.startsWith('/schedule')) {
            setActive(NAV.SCHEDULE);
        } else if (path.startsWith('/pending-task')) {
            setActive(NAV.PENDING);
        } else if (path.startsWith('/profile')) {
            setActive(NAV.PROFILE);
        } else {
            setActive(-1); // No active item
        }
    }, [location]);

    const handleNavClick = (key: number) => {
        setActive(key);
        if (navItemsUrls[key] !== NAV_ORIGIN_URL.get(key)) {
            const updatedNavItemsUrls = [...navItemsUrls];
            updatedNavItemsUrls[key] = NAV_ORIGIN_URL.get(key) as string;
            setNavItemsUrls(updatedNavItemsUrls);
        }
    }

    return (
    <>
        <nav className="w-full h-24 shadow-hard-top rounded-t-3xl fixed bottom-0 bg-white max-w-screen-sm mx-auto">
            <ul className="h-full flex items-center justify-around">
                <BottomNavItem icon={homeImg} url={navItemsUrls[NAV.HOME]} alt="Home Nav"
                    onClick={() => handleNavClick(NAV.HOME)} active={active === NAV.HOME}/>
                <BottomNavItem icon={programImg} url={navItemsUrls[NAV.PROGRAM]} alt="Program Nav"
                    onClick={() => handleNavClick(NAV.PROGRAM)} active={active === NAV.PROGRAM}/>
                <BottomNavItem icon={scheduleImg} url={navItemsUrls[NAV.SCHEDULE]} alt="Schedule Nav" 
                    onClick={() => handleNavClick(NAV.SCHEDULE)} active={active === NAV.SCHEDULE}/>
                <BottomNavItem icon={pendingTaskImg} url={navItemsUrls[NAV.PENDING]} alt="Pending Task Nav" 
                    onClick={() => handleNavClick(NAV.PENDING)} active={active === NAV.PENDING}/>
                <BottomNavItem icon={studentImg} url={navItemsUrls[NAV.PROFILE]} alt="Profile Nav" 
                    onClick={() => handleNavClick(NAV.PROFILE)} active={active === NAV.PROFILE}/>
            </ul>
        </nav>
        <div className="h-28 w-full max-w-screen-sm mx-auto"/> {/* whitespace to get rid of elements hidden by bottom nav */}
    </>
    );
}

export default BottomNav;