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

export interface PresenceClass {
    classId: number;
    classTitle: string;   
    students: StudentPresence[];
}

export type PresenceData = PresenceClass[];