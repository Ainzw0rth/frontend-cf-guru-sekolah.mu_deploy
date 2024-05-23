/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentWorkStatus } from "../types/StudentWork";
import { BASE_URL } from "../const";

export const fetchStudentWorkData = async (activityId: number) => {
    try {
        // Fetch student list in the activity
        const studentResponse = await fetch(`${BASE_URL}/kegiatan/murid/${activityId}`);
        const studentData = await studentResponse.json();
        
        // Fetch student's work data for the activity
        const studentWorkResponse = await fetch(`${BASE_URL}/hasil_karya?jadwal=${activityId}`);
        let studentWorkData = await studentWorkResponse.json();
        
        // Check all student ids
        const studentIds = studentData.data.map((student: any) => student.id_murid);
        const studentWorkIds = studentWorkData.data.map((item: any) => item.id_murid);
        
        const missingIds = studentIds.filter((id: any) => !studentWorkIds.includes(id));

        // Create new student's work data for missing students
        if (missingIds.length > 0) {
            const id_jadwal = activityId;
            const id_guru = studentData.data[0].id_guru;
            for (const id_murid of missingIds) {
                await fetch(`${BASE_URL}/hasil_karya`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_jadwal,
                        id_murid,
                        nama_karya: '',
                        tipe_file: '',
                        file_path: '',
                        id_guru
                    })
                });
            }
            
            // Refetch student's work data
            studentWorkData = await fetch(`${BASE_URL}/hasil_karya?jadwal=${activityId}`).then(response => response.json());
        }
        
        const formattedData = () => {
            try {
                const formattedStudents = studentWorkData.data.map((item: any) => {
                    const student = studentData.data.find((student: any) => student.id_murid === item.id_murid);
                    return {
                        id: item.id_murid,
                        id_work: item.id_karya,
                        name: student ? student.nama_murid : `Murid ${item.id_murid}`,
                        imgUrl: student.path_foto_profil,
                        work_name: item.nama_karya,
                        file_type: item.tipe_file,
                        file: item.file_path,
                        status: determineStatus(item.file_path)
                    };
                });
        
                const formattedData = {
                    activityId: activityId,
                    teacherId: studentData.data[0].id_guru,
                    students: formattedStudents
                };
        
                return formattedData;
            } catch (error) {
                console.error("Error formatting student's work data:", error);
                throw new Error("Failed to format student's work data");
            }
        };

        return formattedData();
    } catch (error) {
        console.error("Error fetching student's work data:", error);
        throw new Error("Failed to fetch student's work data");
    }
}    

const determineStatus = (file: string) => {
    if (!file) {
        return StudentWorkStatus.NOT_YET;
    } else {
        return StudentWorkStatus.COMPLETE;
    }
}