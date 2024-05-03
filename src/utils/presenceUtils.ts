import { PresenceData, PresenceStatus, StudentPresenceResponse } from "../types/Presence";
import { BASE_URL } from "../const";

export function presenceStatusToString (status: PresenceStatus) {
    switch (status) {
        case PresenceStatus.NOT_YET:
            return null;
        case PresenceStatus.ABSENT:
            return 'Alpa';
        case PresenceStatus.SICK:
            return 'Sakit';
        case PresenceStatus.PERMITTED:
            return 'Izin';
        case PresenceStatus.PRESENT:
            return 'Hadir';
    }
}

export function stringToPresenceStatus (status: string) {
    switch (status) {
        case 'Alpa':
            return PresenceStatus.ABSENT;
        case 'Sakit':
            return PresenceStatus.SICK;
        case 'Izin':
            return PresenceStatus.PERMITTED;
        case 'Hadir':
            return PresenceStatus.PRESENT;
        default:
            return PresenceStatus.NOT_YET;
    }
}

export const fetchPresenceData = async (activityId : number) => {
    try {
        const response = await fetch(`${BASE_URL}/presensi/${activityId}`);
        if (!response.ok) {
            console.error('Failed to fetch presence data ' + response.statusText);
            return [];
        }

        const json = await response.json();
        const presenceData : PresenceData = [
            {
                classId: 1,
                classTitle: 'Kelas 1',
                students: json.data.map((studentData: StudentPresenceResponse) => ({
                    id: studentData.id_murid,
                    name: studentData.nama_murid,
                    imgUrl: studentData.path_foto_profil,
                    status: stringToPresenceStatus(studentData.catatan_kehadiran)
                }))
            }
        ]    
        return presenceData;
    } catch (error) {
        console.error('Failed to fetch presence data ' + error);
        return [];
    }
}

export const savePresenceData = async (activityId: number, presenceData: PresenceData, changedIds: number[]) => {
    const filtered = presenceData[0].students.filter(student => changedIds.includes(student.id));
    const sentData = filtered.map(student => ({
        id_murid: student.id,
        catatan_kehadiran: presenceStatusToString(student.status)
    }));
    try {
        const response = await fetch(`https://backend-sekolah-mu-development.vercel.app/presensi/${activityId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sentData)
        });
        if (!response.ok) {
            throw new Error('Failed to save presence data' + response.statusText);
        }
    } catch (error) {
        throw new Error('Failed to save presence data: ' + error);
    }

    return true;
}