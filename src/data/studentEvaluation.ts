import { EvaluationStatus } from "../types/Evaluation";
import { BASE_URL } from "../const";

export const fetchEvaluationData = async (activityId: number) => {
    try {
        // Fetch student list in the activity
        const studentResponse = await fetch(`${BASE_URL}/kegiatan/murid/${activityId}`);
        const studentData = await studentResponse.json();
        
        // Fetch evaluation data for the activity
        const evaluationResponse = await fetch(`${BASE_URL}/evaluasi?jadwal=${activityId}`);
        let evaluationData = await evaluationResponse.json();
        
        // Check all student ids
        const studentIds = studentData.data.map((student: any) => student.id_murid);
        const evaluationIds = evaluationData.data.map((item: any) => item.id_murid);
        
        const missingIds = studentIds.filter((id: any) => !evaluationIds.includes(id));
        
        // Create new evaluation data for missing students
        if (missingIds.length > 0) {
            const id_kegiatan = activityId;
            const id_guru = studentData.data[0].id_guru;
            
            for (const id_murid of missingIds) {
                await fetch(`${BASE_URL}/evaluasi`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_kegiatan,
                        id_murid,
                        presensi: null,
                        nilai: null,
                        catatan: null,
                        feedback: null,
                        id_guru
                    })
                });
            }
            
            // Refetch evaluation data
            evaluationData = await fetch(`${BASE_URL}/evaluasi?jadwal=${activityId}`).then(response => response.json());
        }
                
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
