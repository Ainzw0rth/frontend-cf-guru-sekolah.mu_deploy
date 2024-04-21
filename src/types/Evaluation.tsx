export enum EvaluationStatus {
    NOT_YET = 'Not Yet',
    INCOMPLETE = 'Incomplete',
    COMPLETE = 'Complete',
}

export interface StudentEvaluation {
    id: number;
    name: string;
    imgUrl: string;
    penilaian: number;
    catatan: string;
    feedback: string;
    status: EvaluationStatus;
}

export interface EvaluationClass { 
    activityId: number;
    students: StudentEvaluation[];
}

export type EvaluationData = EvaluationClass;