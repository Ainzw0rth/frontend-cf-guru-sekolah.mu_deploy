import React from 'react';
import { Kegiatan } from '../types/Kegiatan';
import Tag from './Tag';

interface KegiatanCardProps {
  kegiatan: Kegiatan;
}

const ProgramCard: React.FC<KegiatanCardProps> = ({ kegiatan }) => {
  return (
    <div className="flex-none w-72 m-5 bg-neutral8 rounded-lg shadow-md p-2">
        <Tag label={`${kegiatan.time}`} color="neutral" />
      <div className="p-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 pt-4">{kegiatan.title}</h2>
        <Tag label={`${kegiatan.class}`} color="gamboge" />
        <Tag label={`${kegiatan.program}`} color="mint" />
        <Tag label={`${kegiatan.topic}`} />
      </div>
    </div>
  );
};

export default ProgramCard;