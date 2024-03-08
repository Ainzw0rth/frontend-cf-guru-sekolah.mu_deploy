import React from 'react';
import { Program } from '../types/Program';
import Tag from './Tag';
import { Link } from 'react-router-dom';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <Link to={`/program/${program.id}`}>
    <div className="flex-none w-64 m-5 bg-neutral8 rounded-lg shadow-md active:bg-neutral6">
      <img src={program.imageUrl} alt={program.title} className="rounded-lg w-full h-48 object-cover" />
      <div className="p-4">
        <Tag label={`Semester ${program.semester} ${program.academic_year}`} color="gamboge" />
        <h2 className="text-lg font-semibold text-gray-800 mb-2 pt-4 truncate">{program.title}</h2>
      </div>
    </div>
    </Link>
  );
};

export default ProgramCard;