import { StudentActivityCatatan, StudentActivityFeedback } from "../types/Evaluation";

interface StudentNoteItemProps {
    student: StudentActivityCatatan | StudentActivityFeedback;
    type: string;
}

const StudentNoteItem = (props: StudentNoteItemProps) => {
    return (
        <div className="flex flex-col justify-left mb-2">
            <p className="text-xs text-gray-500">{props.student.activity_name}</p>
            {props.type === 'catatan' && 'catatan' in props.student && (
                <h2 className="text-paragraph-3">
                    {(props.student as StudentActivityCatatan).catatan}
                </h2>
            )}
            {props.type === 'feedback' && 'feedback' in props.student && (
                <h2 className="text-paragraph-3">
                    {(props.student as StudentActivityFeedback).feedback}
                </h2>
            )}
        </div>
    );
}

export default StudentNoteItem;