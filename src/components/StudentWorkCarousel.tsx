import React from "react";
import StudentWorkCard from "./StudentWorkCard";
import { StudentActivityKarya } from '../types/Evaluation';

interface StudentWorkCarouselProps {
  student: StudentActivityKarya[];
}

const StudentWorkCarousel: React.FC<StudentWorkCarouselProps> = ({ student }) => {
  return (
    <div className="shadow-md rounded-md overflow-hidden border border-neutral4">
        <div className="bg-persian-blue5 text-neutral6 py-3 px-5 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Hasil Karya</h3>
        </div>
        <div className="pr-2 pl-2">
            <div className="flex overflow-x-auto p-5">
                {student.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-40">
                        <p className="text-lg text-center text-neutral9 italic">Belum ada karya </p>
                    </div>
                ) : (
                    
                    student.map((student) => (
                        <div key={student.work_id} style={{ marginRight: 12 }}>
                            <StudentWorkCard key={student.work_id} student={student} />
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  );
};

export default StudentWorkCarousel;
