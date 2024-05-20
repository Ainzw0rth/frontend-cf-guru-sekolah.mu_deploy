/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { StudentEvaluation } from "../../types/Evaluation";
import { updateBadges } from "../../utils/badgeUtils";
import { BASE_URL } from "../../const";

interface EvaluationPopupProps {
    studentData: StudentEvaluation;
    activityId: number | undefined;
    teacherId: number | undefined;
    onClose: () => void;
    onSave: (updatedStudent: StudentEvaluation) => void;
}

const EvaluationPopup: React.FC<EvaluationPopupProps> = ({ studentData, activityId, teacherId, onClose, onSave }) => {
    const [evaluation, setEvaluation] = useState<StudentEvaluation>(studentData);
    const [tempEvaluation, setTempEvaluation] = useState<StudentEvaluation>(studentData);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async () => {
        try {
            setIsSaving(true);
            setEvaluation(tempEvaluation);

            if (!activityId || !teacherId) {
                throw new Error("Activity ID or Teacher ID is missing");
            }

            await patchEvaluation(activityId, teacherId, tempEvaluation);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                onSave(tempEvaluation);
                onClose();
            }, 1000);
        } catch (error) {
            console.error("Error submitting evaluation:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const handlePenilaianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Handle Penilaian Change", e.target.value);
        const value = parseInt(e.target.value);
        setTempEvaluation({ ...tempEvaluation, penilaian: value });

        if (e.target.value === "" || (value >= 1 && value <= 100)) {
            setErrorMessage("");
        } else {
            console.log("Error Penilaian");
            setErrorMessage("Penilaian harus kosong atau berada di antara 0 dan 100");
        }
    };

    const patchEvaluation = async (activityId: number, teacherId: number, data: any) => {
        try {
            const response = await fetch(`${BASE_URL}/evaluasi?jadwal=${activityId}&murid=${evaluation.id}`, {
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

            updateBadges();
        } catch (error) {
            console.error("Error patching evaluation:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-3/4">
                {isSaving && (
                    <div className="absolute inset-0 bg-neutral1 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {showSuccess && (
                    <div className="absolute inset-0 bg-neutral1 bg-opacity-95 flex items-center justify-center z-50">
                        <div className="bg-blue-500 text-heading-1 text-white rounded-full font-semibold py-2 px-4 shadow-lg transition duration-300">
                            Success!
                        </div>
                    </div>
                )}

                <div className="text-center relative">
                    <span className="absolute top-2 right-4 text-2xl cursor-pointer" onClick={handleClose}>&times;</span>

                    <img src={evaluation.imgUrl} alt={evaluation.name} className="w-24 h-24 rounded-full mb-4 mx-auto" />

                    <h2 className="text-2xl font-semibold mb-4">{evaluation.name}</h2>

                    <div className="mb-4">
                        <label className="block text-left mb-1 font-semibold">Penilaian:</label>
                        <input
                            type="number"
                            value={tempEvaluation.penilaian || ""}
                            onChange={handlePenilaianChange}
                            className={`border rounded-md p-2 w-full ${errorMessage ? 'border-red-500' : ''}`}
                            disabled={evaluation.penilaian > 0 || isSaving}
                        />
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-left mb-1 font-semibold">Feedback Murid:</label>
                        <textarea
                            value={tempEvaluation.feedback}
                            onChange={(e) => setTempEvaluation({ ...tempEvaluation, feedback: e.target.value })}
                            className="border rounded-md p-2 w-full"
                            disabled={isSaving}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-left mb-1 font-semibold">Catatan Internal:</label>
                        <textarea
                            value={tempEvaluation.catatan}
                            onChange={(e) => setTempEvaluation({ ...tempEvaluation, catatan: e.target.value })}
                            className="border rounded-md p-2 w-full"
                            disabled={isSaving}
                        />
                    </div>

                    <button onClick={handleSubmit} className={`bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300 ${isSaving || errorMessage !== "" ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSaving || errorMessage !== ""}>
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EvaluationPopup;