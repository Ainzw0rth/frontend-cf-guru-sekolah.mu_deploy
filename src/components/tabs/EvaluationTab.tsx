import { STUDENT_EVALUATION, fetchEvaluationData } from "../../data/studentEvaluation";
import { EvaluationData, EvaluationStatus, StudentEvaluation, } from "../../types/Evaluation";
import { useState, useEffect } from "react";

// const fetchEvaluationData = (activityId: number) => {
//     console.log(`Fetching evaluation data for activity ${activityId}`);
//     return STUDENT_EVALUATION;
// }

interface StudentEvaluationCardProps {
    student: StudentEvaluation;
}

const StudentEvaluationCard = ({ student }: StudentEvaluationCardProps) => {
    const getStatusClass = () => {
        switch (student.status) {
            case EvaluationStatus.COMPLETE:
                return 'bg-presence-green';
            case EvaluationStatus.INCOMPLETE:
                return 'bg-presence-yellow';
            default:
                return '';
        }
    };

    return (
        <div className={`flex flex-col w-full p-5 shadow-hard rounded-lg gap-3 ${getStatusClass()}`}>
            <div className="flex items-center w-full gap-3">
                <img src={student.imgUrl} alt={student.name} className="w-8 h-8 rounded-full"/>
                <h3 className="text-text-100 text-paragraph-1 font-semibold">{student.name}</h3>
            </div>
        </div>
    );
}

interface EvaluationTabProps {
    activityId: number;
    evaluationData?: EvaluationData;
    onEvaluationDataChange: (data: EvaluationData) => void;
}

const EvaluationTab = ({ activityId, onEvaluationDataChange }: EvaluationTabProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [filteredStudents, setFilteredStudents] = useState<StudentEvaluation[]>([]);
    const [evaluationData, setEvaluationData] = useState<EvaluationData>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataEval: EvaluationData = {
                    activityId: activityId,
                    students: await fetchEvaluationData(activityId)
                };
                console.log("Get data:", dataEval);
                setEvaluationData(dataEval);
                onEvaluationDataChange(dataEval);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching evaluation data:", error);
            }
        };
        fetchData();
    }, [activityId, onEvaluationDataChange]);    

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value);
    };

    const handleSearchClick = () => {
        filterStudents(searchTerm, filterStatus);
    };

    useEffect(() => {
        if (evaluationData) {
            filterStudents(searchTerm, filterStatus);
        }
    }, [evaluationData, searchTerm, filterStatus]);


    const filterStudents = (searchTerm: string, filterStatus: string) => {
        if (!evaluationData) return;

        console.log("Eval:", evaluationData);
        console.log("Eval Student:", evaluationData.students);


        const filteredStudents = evaluationData.students.filter(student => {
            return (
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filterStatus === "" || student.status === filterStatus)
            );
        });
        
        console.log("Filtered Students:", filteredStudents);
        setFilteredStudents(filteredStudents);
    };

    return (
        <div className="flex flex-col mt-5 gap-5 w-5/6 mx-auto">
            <div className="flex items-center gap-3">
                <div className="flex-1 mr-2">
                    <input
                        type="text"
                        placeholder="Cari Siswa"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border rounded-md p-2 w-full"
                        style={{ border: "1px solid #1890ff", borderRadius: "8px", paddingLeft: "10px" }}
                    />
                </div>
                <button
                    onClick={handleSearchClick}
                    className="bg-persian-blue-500 text-white py-3 rounded-md w-20 text-label-4 font-semibold"
                >
                    Cari
                </button>
            </div>
            <div>
                <select
                    value={filterStatus}
                    onChange={handleFilterChange}
                    className="filter-dropdown px-2 py-1 border bg-neutral5 rounded-md flex-auto"
                    style={{ fontSize: '0.8rem'}}
                >
                    <option value="">Status</option>
                    <option value={EvaluationStatus.NOT_YET}>Belum Dikerjakan</option>
                    <option value={EvaluationStatus.INCOMPLETE}>Belum Selesai</option>
                    <option value={EvaluationStatus.COMPLETE}>Selesai</option>
                </select>
            </div>
            {isLoading ? (
                <p className="text-neutral9 italic">Loading...</p>
            ) : (
                filteredStudents.length === 0 ? (
                    <p className="text-neutral9 italic">Siswa tidak ditemukan</p>
                ) : (
                    filteredStudents.map(student => (
                        <StudentEvaluationCard key={student.id} student={student} />
                    ))
                )
            )}
        </div>
    );
}

export default EvaluationTab;