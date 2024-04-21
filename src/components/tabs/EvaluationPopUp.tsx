import React, { useState } from "react";
import { StudentEvaluation } from "../../types/Evaluation";

interface EvaluationPopupProps {
    studentData: StudentEvaluation;
    activityId: number | undefined;
    teacherId: number | undefined;
    onClose: () => void;
}

const EvaluationPopup: React.FC<EvaluationPopupProps> = ({ studentData, activityId, teacherId, onClose }) => {
    const [evaluation, setEvaluation] = useState<StudentEvaluation>(studentData);
    const [tempEvaluation, setTempEvaluation] = useState<StudentEvaluation>(studentData);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async () => {
        try {
            setIsSaving(true);
            setEvaluation(tempEvaluation);

            if (!activityId || !teacherId) {
                throw new Error("Activity ID or Teacher ID is missing");
            }

            await patchEvaluation(activityId, teacherId, tempEvaluation);
            onClose();
        } catch (error) {
            console.error("Error submitting evaluation:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const patchEvaluation = async (activityId: number, teacherId: number, data: any) => {
        try {
            const response = await fetch(`https://backend-sekolah-mu-development.vercel.app/evaluasi?kegiatan=${activityId}&murid=${evaluation.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nilai: data.penilaian,
                    catatan: data.catatan,
                    feedback: data.feedback,
                    id_guru: teacherId
                })
            });
            if (!response.ok) {
                throw new Error('Failed to patch evaluation');
            }
        } catch (error) {
            console.error("Error patching evaluation:", error);
        }
    };

    return (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "1000" }}>
            <div className="popup" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "80%" }}>
                <div className="popup-content" style={{ textAlign: "center" }}>

                    <span className="close" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "20px", cursor: "pointer", fontSize: "30px" }}>&times;</span>

                    <img src={evaluation.imgUrl} alt={evaluation.name} className="w-24 h-24 rounded-full mb-4 mx-auto" /> 

                    <h2 className="text-heading-2 text-2xl text-text-100 font-semibold mb-4">{evaluation.name}</h2>
    
                    <div className="flex items-center mb-4">
                        <label className="text-label-1 text-text-100 mr-5">Penilaian:</label>
                        <input
                            type="number"
                            value={tempEvaluation.penilaian}
                            onChange={(e) => {
                                setTempEvaluation({ ...tempEvaluation, penilaian: parseInt(e.target.value) })
                            }}
                            className="border rounded-md p-2 text-label-1 bg-neutral-4 w-full"
                            disabled={evaluation.penilaian > 0}
                        />
                    </div>
    
                    <div className="flex flex-col items-start mb-4">
                        <label className="text-label-1 text-text-100 mb-1">Feedback Murid:</label>
                        <textarea
                            value={tempEvaluation.feedback}
                            onChange={(e) => setTempEvaluation({ ...tempEvaluation, feedback: e.target.value })}
                            className="border rounded-md p-2 text-label-1 bg-neutral4 w-full"
                        />
                    </div>
    
                    <div className="flex flex-col items-start mb-4">
                        <label className="text-label-1 text-text-100 mb-1">Catatan Internal:</label>
                        <textarea
                            value={tempEvaluation.catatan}
                            onChange={(e) => setTempEvaluation({ ...tempEvaluation, catatan: e.target.value })}
                            className="border rounded-md p-2 text-label-1 bg-neutral4  w-full"
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

export default EvaluationPopup;