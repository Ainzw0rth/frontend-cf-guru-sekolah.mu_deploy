import React from 'react';
import { Kegiatan } from '../types/Kegiatan';
import Tag from './Tag';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

interface KegiatanCardProps {
  kegiatan: Kegiatan;
}

const KegiatanPendingTaskCard: React.FC<KegiatanCardProps> = ({ kegiatan }) => {
    return (
    <div>
      <div className='max-[375px]:w-64 w-80 mx-5 mb-5'>
        <div className="w-full flex-col bg-neutral8 rounded-lg shadow-md p-4">
          <div className="w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 pt-1 truncate">{kegiatan.title}</h2>
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
                  '& .MuiLinearProgress-root': {
                    backgroundColor: '#e0e0e0',
                  },
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