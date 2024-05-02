import { StudentActivityCatatan, StudentActivityFeedback } from "../types/Evaluation";
import StudentNoteItem from "./StudentNoteItem";

interface StudentNoteProps {
    student: StudentActivityCatatan[] | StudentActivityFeedback[];
    type: string;
}

const StudentNote = (props: StudentNoteProps) => {
    return (
        <div className="shadow-md rounded-md overflow-hidden border border-neutral4">
          <div className="bg-persian-blue5 text-neutral6 py-3 px-5 flex justify-between items-center">
            <h3 className="font-semibold text-lg">{props.type === 'catatan'? "Catatan Internal" : "Feedback Murid"}</h3>
          </div>
          <div className="flex flex-col overflow-y-auto gap-4 p-5" style={{ maxHeight: '200px' }}>
            {
              props.student.length === 0 ? (
                <p className="text-lg text-center text-neutral9 italic">Belum ada {props.type === 'catatan'? "catatan" : "feedback"}</p>
              ) : (
                props.student.map((student, index) => {
                    return (
                        <div key={index}>
                            <StudentNoteItem student={student} type={props.type} />
                            {index < props.student.length - 1 && <hr className="border-t border-gray-300" />}
                        </div>
                    );
                })
              )
            }
          </div>
        </div>
      );      
}


export default StudentNote;