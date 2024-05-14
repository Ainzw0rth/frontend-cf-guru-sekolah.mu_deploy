import React, { useState } from "react";
import { StudentWork } from "../../types/StudentWork";
import { BASE_URL } from "../../const";

interface StudentWorkPopupProps {
    studentData: StudentWork;
    activityId: number | undefined;
    teacherId: number | undefined;
    onClose: () => void;
}

const StudentWorkPopUp: React.FC<StudentWorkPopupProps> = ({ studentData, activityId, teacherId, onClose }) => {
    const [studentWork] = useState<StudentWork>(studentData);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async () => {
        try {
            setIsSaving(true);

            if (!activityId || !teacherId || !file) {
                throw new Error("Activity ID, Teacher ID, or file is missing");
            }

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`${BASE_URL}/hasil_karya?jadwal=${activityId}&murid=${studentWork.id}&guru=${teacherId}`, {
                method: 'PATCH',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to patch student\'s work');
            }

            onClose();
        } catch (error) {
            console.error("Error submitting student's work:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file);
    };

    return (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "1000" }}>
            <div className="popup" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "80%" }}>
                <div className="popup-content" style={{ textAlign: "center" }}>

                    <span className="close" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "20px", cursor: "pointer", fontSize: "30px" }}>&times;</span>

                    <img src={studentWork.imgUrl} alt={studentWork.name} className="w-24 h-24 rounded-full mb-4 mx-auto" /> 

                    <h2 className="text-heading-2 text-2xl text-text-100 font-semibold mb-4">{studentWork.name}</h2>
    
                    <div className="flex items-center mb-4">
                        <label className="text-label-1 text-text-100 mr-5">Hasil Karya:</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border rounded-md p-2 text-label-1 bg-neutral-4 w-full"
                        />
                    </div>
                    <button onClick={handleSubmit} className="bg-persian-blue-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-persian-blue-600 transition duration-300">
                        {isSaving ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </div>
        </div>
    );        
};

export default StudentWorkPopUp;
