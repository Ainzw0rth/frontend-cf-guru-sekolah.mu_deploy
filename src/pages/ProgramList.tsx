import { Link } from "react-router-dom";

const ProgramList = () => { 
    return (
        <div className='h-96 w-screen flex flex-col justify-center items-center'>
            <p className='text-3xl text-black'>Program List</p>
            <Link to="/program/1" className="text-xl text-persian-blue5 underline">
                Example Program 1
            </Link>
        </div>
    );
}

export default ProgramList;