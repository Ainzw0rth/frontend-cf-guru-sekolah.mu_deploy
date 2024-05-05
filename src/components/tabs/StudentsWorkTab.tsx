// import { fetchStudentWorkData } from "../../data/studentWork";
import { STUDENT_WORK } from "../../data/studentWork"
import { StudentWorkData, StudentWorkStatus, StudentWork, } from "../../types/StudentWork";
import StudentWorkPopUp from "./StudentWorkPopUp";
import { useState, useEffect } from "react";
import { fetchStudentWorkData } from "../../data/studentWork";


// const fetchStudentWorkData = (activityId: number) => {
//     console.log(`Fetching evaluation data for activity ${activityId}`);
//     return STUDENT_WORK;
// }

interface StudentWorkCardProps {
    student: StudentWork;
    onClick: () => void;
}

const StudentWorkCard = ({student, onClick}: StudentWorkCardProps) => {
    const getStatusClass = () => {
        switch (student.status) {
            case StudentWorkStatus.COMPLETE:
                return 'bg-presence-green';
            case StudentWorkStatus.INCOMPLETE:
                return 'bg-presence-yellow';
            default:
                return '';
        }
    };

    return (
        <div 
            className={`flex flex-col w-full p-5 shadow-hard rounded-lg gap-3 ${getStatusClass()}`}
            onClick={onClick}
        >
            <div className="flex items-center w-full gap-3">
                <img src={student.imgUrl} alt={student.name} className="w-8 h-8 rounded-full"/>
                <h3 className="text-text-100 text-paragraph-1 font-semibold">{student.name}</h3>
            </div>
        </div>
    );
}

interface StudentWorkTabProps {
    activityId: number;
    studentWorkData?: StudentWorkData;
    onStudentWorkDataChange: (data: StudentWorkData) => void;
}

const StudentWorkTab = ({ activityId, onStudentWorkDataChange }: StudentWorkTabProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [filteredStudents, setFilteredStudents] = useState<StudentWork[]>([]);
    const [studentWorkData, setStudentWorkData] = useState<StudentWorkData>();
    const [selectedStudent, setSelectedStudent] = useState<StudentWork | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataWork : StudentWorkData = await fetchStudentWorkData(activityId);
                console.log("Get data:", dataWork);
                setStudentWorkData(dataWork);
                onStudentWorkDataChange(dataWork);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching student's work data:", error);
            }
        };
        fetchData();
    }, [activityId, onStudentWorkDataChange]);    

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
        if (studentWorkData) {
            filterStudents(searchTerm, filterStatus);
        }
    }, [studentWorkData, searchTerm, filterStatus]);


    const filterStudents = (searchTerm: string, filterStatus: string) => {
        if (!studentWorkData) return;

        console.log("Student's Work:", studentWorkData);
        console.log("Student's Work Student:", studentWorkData.students);


        const filteredStudents = studentWorkData.students.filter(student => {
            console.log("Student:", student);
            return (
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filterStatus === "" || student.status === filterStatus)
            );
        });        
        
        console.log("Filtered Students:", filteredStudents);
        setFilteredStudents(filteredStudents);
    };

    const handleStudentClick = (student: StudentWork) => {
        setSelectedStudent(student);
    };    

    const handleClosePopup = () => {
        setSelectedStudent(null);
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
                    <option value={StudentWorkStatus.NOT_YET}>Belum Dikerjakan</option>
                    <option value={StudentWorkStatus.COMPLETE}>Selesai</option>
                </select>
            </div>
            {isLoading ? (
                <p className="text-neutral9 italic">Loading...</p>
            ) : (
                filteredStudents.length === 0 ? (
                    <p className="text-neutral9 italic">Siswa tidak ditemukan</p>
                ) : (
                    filteredStudents.map(student => (
                        <StudentWorkCard
                            key={student.id}
                            student={student}
                            onClick={() => handleStudentClick(student)}
                        />
                    ))
                )
            )}
            
            {selectedStudent && (
                <StudentWorkPopUp 
                    studentData={selectedStudent} 
                    activityId={studentWorkData?.activityId} 
                    teacherId={studentWorkData?.teacherId} 
                    onClose={handleClosePopup} 
                />
            )}
        </div>
    );
}

export default StudentWorkTab;
