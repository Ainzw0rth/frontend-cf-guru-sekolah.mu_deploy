import React from 'react';
import { Link } from 'react-router-dom';
import { Murid } from '../types/Murid';

interface DashboardCardProps {
  studentData: Murid;
  type?: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ studentData, type }) => {
  console.log("studentData", studentData);
  if (!type) { type = 0 }
  if (type === 1) {
    return (
      <Link to={`/dashboard/${studentData.id}`} className="flex-1">
        <div className="flex-none w-44 m-3 bg-neutral8 rounded-lg shadow-md active:bg-neutral6 justify-center">
          <div className="bg-neutral6 p-2 rounded-lg w-full h-36 object-cover flex justify-center items-center">
            <img 
              src={studentData.path_profile} 
              alt={studentData.name} 
              className="rounded-full w-24 h-24 object-cover" 
            />
          </div>
          <div className="p-4">
            <h2 className="text-md font-semibold text-text-100 mb-1 truncate">{studentData.name}</h2>
            <p className="text-xs font-light text-neutral1 truncate">NISN : {studentData.nisn} </p>
          </div>
        </div>
      </Link>
    );
  } else {
    const truncatedName = studentData.name.length >= 50 ? `${studentData.name.slice(0, 50)}...` : `${studentData.name}${' '.repeat(50 - studentData.name.length)}`;
    return (
      <Link to={`/dashboard/${studentData.id}`} className="flex-1">
        <div className="flex-none w-36 bg-neutral8 rounded-lg shadow-md active:bg-neutral6">
          <div className="bg-gamboge6 p-2 rounded-lg w-full h-36 object-cover flex justify-center items-center">
            <img 
              src={studentData.path_profile} 
              alt={studentData.name} 
              className="rounded-full w-24 h-24 object-cover" 
            />
          </div>
          <div className="p-4">
            <h2 className="text-xs font-semibold text-text-100 mb-1 truncate">{truncatedName}</h2>
            <p className="text-xs font-light text-neutral1 truncate">NISN : {studentData.nisn} </p>
          </div>
        </div>
      </Link>
    );
  }
};

export default DashboardCard;
