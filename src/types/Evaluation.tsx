import { Murid } from './Murid';

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
    teacherId: number;
    students: StudentEvaluation[];
}

export type EvaluationData = EvaluationClass;

export interface StudentPresenceSummary {
    status: string;
    total: number;
}

export interface StudentActivityCatatan {
    activity_id: number;
    activity_name: string;
    catatan: string;
}

export interface StudentActivityFeedback {
    activity_id: number;
    activity_name: string;
    feedback: string;
}

export interface StudentActivityKarya {
    activity_id: number;
    activity_name: string;
    work_id: number;
    work_name: string;
    work_type: string;
    work_path: string;
}

export interface StudentDashboard {
    identity: Murid | null;
    presenceSummary: StudentPresenceSummary[];
    scoreSummary: number | null;
    activityCatatan: StudentActivityCatatan[];
    activityFeedback: StudentActivityFeedback[];
    activityKarya: StudentActivityKarya[];
}