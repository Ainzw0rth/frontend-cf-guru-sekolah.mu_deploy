import React, { useState } from 'react';
import { StudentActivityKarya } from '../types/Evaluation';
import StudentWorkPopUp from './StudentWorkPopUp';

import pdf_placeholder from '../assets/pdf_placeholder.png';
import video_placeholder from '../assets/video_placeholder.png';

interface StudentWorkCardProps {
  student: StudentActivityKarya;
}

const StudentWorkCard: React.FC<StudentWorkCardProps> = ({ student }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openContent = () => {
    console.log('Open Content Function');
    setIsPopUpOpen(true);
  };

  const closeContent = () => {
    console.log('Close Content Function');
    setIsPopUpOpen(false);
  };

  console.log('IS POP UP OPEN:', isPopUpOpen);

  return (
    <div className="flex-1 cursor-pointer w-36 mr-4" onClick={openContent}>
      <div className="flex-none bg-neutral8 rounded-lg shadow-md active:bg-neutral6 relative" style={{ height: '150px' }}>
        {student.work_type === 'Video' ? (
          <img src={video_placeholder} className="rounded-lg w-full h-full object-cover" alt="Karya Video" />
        ) : student.work_type === 'Image' ? (
          <img src={student.work_path} className="rounded-lg w-full h-full object-cover" alt="Karya Image" />
        ) : (
          <img src={pdf_placeholder} className="rounded-lg w-full h-full object-cover" alt="Karya Dokumen" />
        )}
      </div>

      <div className="p-4 flex flex-col justify-between" style={{ height: '5.5em' }}>
        <h2 className="text-paragraph-3 font-semibold text-text-100 mb-1 overflow-hidden" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>{student.work_name}</h2>
        <p className="text-paragraph-3 font-light text-neutral1 truncate">{student.activity_name}</p>
      </div>
      
      {isPopUpOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <StudentWorkPopUp key={student.work_id} student={student} onClose={closeContent} />
        </div>
      )}
    </div>
  );
};

export default StudentWorkCard;