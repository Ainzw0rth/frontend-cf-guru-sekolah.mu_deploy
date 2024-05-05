import React from 'react';
import { StudentActivityKarya } from '../types/Evaluation';
import PdfViewer from './PdfViewer';

interface StudentWorkPopUpProps {
    student: StudentActivityKarya;
    onClose: () => void;
}

const StudentWorkPopUp: React.FC<StudentWorkPopUpProps> = ({ student, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "1000", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="popup" style={{ position: "relative", backgroundColor: "white", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "90%", maxWidth: "400px", overflow: "auto" }}>
                <div className="bg-cobalt6 text-text-100 py-3 px-5 flex flex-col-2 justify-between items-center">
                    <h3 className="font-semibold text-lg">Hasil Karya</h3>
                    <span onClick={handleClose} className="top-3 right-3 text-gray-600 text-2xl cursor-pointer focus:outline-none">&times;</span>
                </div>
                <div className="popup-content" style={{ textAlign: "center", padding: "30px" }}>
                    <div className="bg-neutral3 flex justify-center items-center rounded-lg" style={{ height: '300px' }}>
                        {student.work_type === 'Video' ? (
                            <video src={student.work_path} controls/>
                        ) : student.work_type === 'Image' ? (
                            <img src={student.work_path} alt={student.work_name} style={{ width: '90%', height: '90%', objectFit: 'cover' }} />
                        ) : student.work_type === 'PDF' ? (
                            <PdfViewer contentUrl={student.work_path} />
                        ) : (
                            <div>
                                <p className='font-bold mb-5'>File tidak dapat ditampilkan</p>
                                <button className="bg-persian-blue-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-persian-blue-600 transition duration-300">
                                    <a href={student.work_path} download>Unduh</a>
                                </button>
                            </div>
                        )}
                    </div>

                    <h2 className="text-lg font-semibold mt-4">{student.work_name}</h2>
                    <p className="text-sm text-gray-500 mt-2">{student.activity_name}</p>
                </div>
            </div>
        </div>
      );      
};

export default StudentWorkPopUp;
