export enum PresenceStatus {
    NOT_YET = 'Not Yet',
    ABSENT = 'Absent',
    SICK = 'Sick',
    PERMITTED = 'Permitted',
    PRESENT = 'Present',
}

export interface StudentPresence {
    id: number;
    name: string;
    imgUrl: string;
    status: PresenceStatus;
}

export interface StudentPresenceResponse {
    id_murid: number;
    nama_murid: string;
    path_foto_profil: string;
    catatan_kehadiran: string;
}

export interface PresenceClass {
    students: StudentPresence[];
}

export type PresenceData = PresenceClass;