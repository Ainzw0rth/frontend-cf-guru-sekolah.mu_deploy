import homeImg from '../assets/nav/home.png';
import programImg from '../assets/nav/program.png';
import scheduleImg from '../assets/nav/schedule.png';
import pendingTaskImg from '../assets/nav/pending.png';
import studentImg from '../assets/nav/profile.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';


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
    STUDENT: 4
}

const BottomNav = () => {
    const [active, setActive] = useState(NAV.HOME);

    const handleNavClick = (key: number) => {
        setActive(key);
    }

    return (
    <>
        <nav className="w-full h-24 shadow-hard-top rounded-t-3xl fixed bottom-0 bg-white max-w-screen-sm mx-auto">
            <ul className="h-full flex items-center justify-around">
                <BottomNavItem icon={homeImg} url="/" alt="Home Nav" 
                    onClick={() => handleNavClick(NAV.HOME)} active={active === NAV.HOME}/>
                <BottomNavItem icon={programImg} url="/program" alt="Program Nav" 
                    onClick={() => handleNavClick(NAV.PROGRAM)} active={active === NAV.PROGRAM}/>
                <BottomNavItem icon={scheduleImg} url="/schedule" alt="Schedule Nav" 
                    onClick={() => handleNavClick(NAV.SCHEDULE)} active={active === NAV.SCHEDULE}/>
                <BottomNavItem icon={pendingTaskImg} url="/pending-task" alt="Pending Task Nav" 
                    onClick={() => handleNavClick(NAV.PENDING)} active={active === NAV.PENDING}/>
                <BottomNavItem icon={studentImg} url="/students" alt="Students Nav" 
                    onClick={() => handleNavClick(NAV.STUDENT)} active={active === NAV.STUDENT}/>
            </ul>
        </nav>
        <div className="h-28 w-full max-w-screen-sm mx-auto"/> {/* whitespace to get rid of elements hidden by bottom nav */}
    </>
    );
}

export default BottomNav;