import programImg from '../assets/nav/program.png';
import homeImg from '../assets/nav/home.png';
import profileImg from '../assets/nav/profile.png';
import { Link } from 'react-router-dom';

const BottomNavItem = (props: {icon: string, url: string, alt?: string}) => {
    return (
        <li>
            <Link to={props.url}>
                <img 
                    src={props.icon} 
                    alt={props.alt ? props.alt : 'Nav Icon'} 
                    className="h-10"    
                />
            </Link>
        </li>
    );
}

const BottomNav = () => {
    return (
    <>
        <nav className="w-full h-24 shadow-hard-top rounded-t-3xl fixed bottom-0 bg-white max-w-screen-sm mx-auto">
            <ul className="h-full flex items-center justify-around">
                <BottomNavItem icon={homeImg} url="/" alt="Home Nav"/>
                <BottomNavItem icon={programImg} url="/program" alt="Program Nav"/>
                <BottomNavItem icon={profileImg} url="/profile" alt="Profile Nav"/>
            </ul>
        </nav>
        <div className="h-24 w-full max-w-screen-sm mx-auto"/> {/* whitespace to get rid of elements hidden by bottom nav */}
    </>
    );
}

export default BottomNav;