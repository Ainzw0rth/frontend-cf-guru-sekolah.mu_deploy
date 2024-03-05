import React from 'react';
import { Kegiatan } from '../types/Kegiatan';
import Tag from './Tag';
import { Link } from 'react-router-dom';

interface KegiatanCardProps {
  kegiatan: Kegiatan;
}

const ProgramCard: React.FC<KegiatanCardProps> = ({ kegiatan }) => {
    return (
    <div>
      <div className='w-80 mx-5 mb-5'>
        <div className="w-full flex-col bg-neutral8 rounded-lg shadow-md p-4">
          <div className="w-full flex justify-between items-center">
            <Tag label={`${kegiatan.time}`} color="neutral" />
            <Link  className='flex items-center font-bold text-persian-blue-500 active:text-persian-blue4' to={`/kegiatan/${kegiatan.id}`}>
                Detail Kegiatan &gt;
            </Link>
          </div>
          <div className="w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 pt-1 truncate">{kegiatan.title}</h2>
            <div className='flex flex-wrap'>
              <Tag label={`${kegiatan.class}`} color="gamboge"/>
              <Tag label={`${kegiatan.program}`} color="mint" />
              <Tag label={`${kegiatan.topic}`} />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };



export default ProgramCard;