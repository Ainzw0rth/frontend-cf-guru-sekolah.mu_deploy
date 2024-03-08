import { useNavigate } from 'react-router-dom';
import arrowBack from '../assets/arrow_back.png';

const AppBar = (props : {title : string}) => { 
    const navigate = useNavigate();
    return (
        <div className="flex items-center px-5 h-16 gap-3 bg-neutral8">
            <img src={arrowBack} alt="Back" className="h-6 cursor-pointer" onClick={() => {navigate(-1)}}/>
            <h1 className='text-text-100 text-body-1 font-semibold'>{props.title}</h1>
        </div>
    )
}

export default AppBar;