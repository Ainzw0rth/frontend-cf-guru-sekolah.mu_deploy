export enum StudentWorkStatus {
    NOT_YET = 'Not Yet',
    INCOMPLETE = 'Incomplete',
    COMPLETE = 'Complete',
}

export interface StudentWork {
    id: number;
    name: string;
    imgUrl: string;
    file: string;
    status: StudentWorkStatus;
}

export interface StudentWorkClass { 
    activityId: number;
    teacherId: number;
    students: StudentWork[];
}

export type StudentWorkData = StudentWorkClass;