import React from 'react';
import { Kegiatan } from '../types/Kegiatan';
import Tag from './Tag';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';

interface KegiatanCardProps {
  kegiatan: Kegiatan;
}

const KegiatanPendingTaskCard: React.FC<KegiatanCardProps> = ({ kegiatan }) => {
    return (
    <div>
      <div className='max-[375px]:w-64 w-80 mx-5 mb-5'>
        <div className="w-full flex-col bg-neutral8 rounded-lg shadow-md p-4">
          <div className="w-full">
            <div className="w-full flex justify-between pt-1 mb-2">
              <h2 className="text-lg font-semibold text-gray-800 truncate">{kegiatan.title}</h2>
              <Link  className='flex items-center font-bold text-persian-blue-500 active:text-persian-blue4 text-body-1' to={`/kegiatan/${kegiatan.id}`}>
                  Lanjutkan Tugas &gt;
              </Link>
            </div>
            <div className='flex flex-wrap'>
              <Tag label={`${kegiatan.class}`} color="gamboge"/>
              <Tag label={`${kegiatan.program}`} color="mint" />
            </div>
            <div className="w-full pt-4 flex items-center">
              <LinearProgress
                variant="determinate"
                value={kegiatan.taskPercentage}
                className='rounded-lg shadow-md flex-grow'
                sx={{
                  height: '10px',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#2325ba',
                  },
                }}
              />
              <p className='text-text-100 text-right ml-2'>{kegiatan.taskPercentage}%</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };



export default KegiatanPendingTaskCard;