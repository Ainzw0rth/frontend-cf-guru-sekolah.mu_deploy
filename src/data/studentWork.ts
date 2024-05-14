import { StudentWorkData, StudentWorkStatus } from "../types/StudentWork";

export const STUDENT_WORK : StudentWorkData =
    {   
        activityId: 1,
        teacherId: 1,
        students: [
            {id: 1, name: 'Eren Yeager', imgUrl: 'https://i.pinimg.com/736x/3f/4c/e9/3f4ce92510bf6161969dcdc9bda93ffb.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 2, name: 'Mikasa Ackerman', imgUrl: 'https://i.pinimg.com/736x/90/06/3a/90063a3ba949650fe19a4148abeb077d.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.INCOMPLETE},
            {id: 3, name: 'Armin Arlert', imgUrl: 'https://i.pinimg.com/736x/2a/ae/7b/2aae7b65226b191751ffe9fa6367656b.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.COMPLETE},
            {id: 4, name: 'Levi Ackerman', imgUrl: 'https://i.pinimg.com/736x/5a/bd/7f/5abd7f6afd6c8868bd46d65596f25ce9.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 5, name: 'Hange Zoë', imgUrl: 'https://i.pinimg.com/736x/c9/33/6f/c9336f3f0a0160c3e2d0e18c7d096b73.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 6, name: 'Erwin Smith', imgUrl: 'https://i.pinimg.com/originals/76/e6/4d/76e64db3fc6dc3af8cb8267456837162.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 7, name: 'Jean Kirstein', imgUrl: 'https://i.pinimg.com/736x/82/c1/c1/82c1c178e46922824e9120d4ad055663.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 8, name: 'Connie Springer', imgUrl: 'https://i.pinimg.com/originals/1e/96/9f/1e969fdbd5b6c255032edec9f3b475e2.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 9, name: 'Sasha Blouse', imgUrl: 'https://i.pinimg.com/originals/e0/76/cd/e076cda4ac938cfa5e52c39ee8cf62fa.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 10, name: 'Historia Reiss', imgUrl: 'https://i.pinimg.com/736x/f8/ff/ac/f8ffac6d04cfde37c6d9374cbdaf77c5.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 11, name: 'Ymir', imgUrl: 'https://i.pinimg.com/originals/82/c4/04/82c404cc5a83254d702144f497f1d459.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 12, name: 'Annie Leonhart', imgUrl: 'https://i.pinimg.com/1200x/1c/27/5d/1c275d6741ecc034fba25017c42352c2.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 13, name: 'Reiner Braun', imgUrl: 'https://i.pinimg.com/originals/94/36/70/9436708b8827b496e824314c73c5dd9c.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 14, name: 'Bertholdt Hoover', imgUrl: 'https://i.pinimg.com/550x/86/c1/48/86c1487d53dec1133c899ae67be98dcb.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 15, name: 'Pieck Finger', imgUrl: 'https://i.pinimg.com/736x/a2/22/4d/a2224d6a56b656613f8b08664cbd99a6.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 16, name: 'Porco Galliard', imgUrl: 'https://i.pinimg.com/originals/29/27/10/29271091cf1e023ba8bf6e9fae04c3c1.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 17, name: 'Zeke Yeager', imgUrl: 'https://i.pinimg.com/originals/94/82/fd/9482fd4fbbaae27940c37ebf30bf058a.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 18, name: 'Gabi Braun', imgUrl: 'https://i.pinimg.com/originals/aa/e0/e3/aae0e3d9404ec2b695a1b356bb001b33.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
            {id: 19, name: 'Falco Grice', imgUrl: 'https://i.pinimg.com/originals/4e/e3/47/4ee34739a37d0775fbeb88efac04b47c.jpg', work_name:'', file_type:'', file: '', status: StudentWorkStatus.NOT_YET},
        ]
    };

export const fetchStudentWorkData = async (activityId: number) => {
    try {
        // Fetch student list in the activity
        const studentResponse = await fetch(`https://backend-sekolah-mu-development.vercel.app/kegiatan/murid/${activityId}`);
        const studentData = await studentResponse.json();
        
        // Fetch student's work data for the activity
        const studentWorkResponse = await fetch(`https://backend-sekolah-mu-development.vercel.app/hasil_karya?jadwal=${activityId}`);
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
                console.log("id_murid :", id_murid);
                await fetch(`https://backend-sekolah-mu-development.vercel.app/hasil_karya`, {
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
            studentWorkData = await fetch(`https://backend-sekolah-mu-development.vercel.app/hasil_karya?jadwal=${activityId}`).then(response => response.json());
            console.log("studentWorkData1 :", studentWorkData);
        }
        
        const formattedData = () => {
            try {
                const formattedStudents = studentWorkData.data.map((item: any) => {
                    const student = studentData.data.find((student: any) => student.id_murid === item.id_murid);
                    return {
                        id: item.id_murid,
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