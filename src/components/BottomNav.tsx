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

const NAV_KEY = {
    home: 0,
    program: 1,
    schedule: 2,
    pending: 3,
    student: 4
}

const BottomNav = () => {
    const [active, setActive] = useState(NAV_KEY.home);

    const handleNavClick = (key: number) => {
        setActive(key);
    }

    return (
    <>
        <nav className="w-full h-24 shadow-hard-top rounded-t-3xl fixed bottom-0 bg-white max-w-screen-sm mx-auto">
            <ul className="h-full flex items-center justify-around">
                <BottomNavItem icon={homeImg} url="/" alt="Home Nav" 
                    onClick={() => handleNavClick(NAV_KEY.home)} active={active === NAV_KEY.home}/>
                <BottomNavItem icon={programImg} url="/program" alt="Program Nav" 
                    onClick={() => handleNavClick(NAV_KEY.program)} active={active === NAV_KEY.program}/>
                <BottomNavItem icon={scheduleImg} url="/schedule" alt="Schedule Nav" 
                    onClick={() => handleNavClick(NAV_KEY.schedule)} active={active === NAV_KEY.schedule}/>
                <BottomNavItem icon={pendingTaskImg} url="/pending-task" alt="Pending Task Nav" 
                    onClick={() => handleNavClick(NAV_KEY.pending)} active={active === NAV_KEY.pending}/>
                <BottomNavItem icon={studentImg} url="/students" alt="Students Nav" 
                    onClick={() => handleNavClick(NAV_KEY.student)} active={active === NAV_KEY.student}/>
            </ul>
        </nav>
        <div className="h-24 w-full max-w-screen-sm mx-auto"/> {/* whitespace to get rid of elements hidden by bottom nav */}
    </>
    );
}

export default BottomNav;