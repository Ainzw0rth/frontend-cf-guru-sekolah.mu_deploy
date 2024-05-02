import React from 'react';
import { Link } from 'react-router-dom';
import { Murid } from '../types/Murid';

interface DashboardCardProps {
  studentData: Murid;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ studentData }) => {
  console.log("studentData", studentData);
  return (
    <Link to={`/dashboard/${studentData.id}`} className="flex-1">
      <div className="flex-none w-40 bg-neutral8 rounded-lg shadow-md active:bg-neutral6">
        <div className="bg-gamboge6 p-2 rounded-lg w-full h-36 object-cover flex justify-center items-center">
          <img 
            src={"https://i.pinimg.com/736x/c9/33/6f/c9336f3f0a0160c3e2d0e18c7d096b73.jpg"} 
            alt={studentData.name} 
            className="rounded-full w-28 h-28 object-cover" 
          />
        </div>
        <div className="p-4">
          <h2 className="text-md font-semibold text-text-100 mb-1 truncate">{studentData.name}</h2>
          <p className="text-xs font-light text-neutral1 truncate">NISN : {studentData.nisn} </p>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
