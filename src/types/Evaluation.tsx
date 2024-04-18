export enum EvaluationStatus {
    NOT_YET = 'Not Yet',
    INCOMPLETE = 'Incomplete',
    COMPLETE = 'Complete',
}

export interface StudentEvaluation {
    id: number;
    name: string;
    imgUrl: string;
    status: EvaluationStatus;
}

export interface EvaluationClass {
    classId: number;
    classTitle: string;   
    students: StudentEvaluation[];
}

export type EvaluationData = EvaluationClass[];