/* eslint-disable @typescript-eslint/no-explicit-any */
import { EvaluationStatus } from "../types/Evaluation";
import { BASE_URL } from "../const";

export const fetchEvaluationData = async (activityId: number) => {
    try {
        // Fetch student list in the activity
        const studentResponse = await fetch(`${BASE_URL}/kegiatan/murid/${activityId}`);
        const studentData = await studentResponse.json();
        
        // Fetch evaluation data for the activity
        const evaluationData = await fetch(`${BASE_URL}/evaluasi?jadwal=${activityId}`).then(response => response.json());
                
        evaluationData.data.sort((a: any, b: any) => a.id_murid - b.id_murid);

        const formattedData = () => {
            try {
                const formattedStudents = evaluationData.data.map((item: any) => {
                    const student = studentData.data.find((student: any) => student.id_murid === item.id_murid);
                    return {
                        id: item.id_murid,
                        name: student ? student.nama_murid : `Murid ${item.id_murid}`,
                        imgUrl: student.path_foto_profil,
                        penilaian: item.penilaian,
                        catatan: item.catatan,
                        feedback: item.feedback,
                        status: determineStatus(item.penilaian, item.catatan, item.feedback)
                    };
                });
        
                const formattedData = {
                    activityId: activityId,
                    teacherId: studentData.data[0].id_guru,
                    students: formattedStudents
                };
        
                return formattedData;
            } catch (error) {
                console.error("Error formatting evaluation data:", error);
                throw new Error("Failed to format evaluation data");
            }
        };

        return formattedData();
    } catch (error) {
        console.error("Error fetching evaluation data:", error);
        throw new Error("Failed to fetch evaluation data");
    }
}    

const determineStatus = (penilaian: number, catatan: string, feedback: string) => {
    if (!penilaian && !catatan && !feedback) {
        return EvaluationStatus.NOT_YET;
    } else if (!penilaian || !catatan || !feedback) {
        return EvaluationStatus.INCOMPLETE;
    } else {
        return EvaluationStatus.COMPLETE;
    }
}
