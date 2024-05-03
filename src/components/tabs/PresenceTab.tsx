import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { PresenceClass, PresenceData, PresenceStatus, StudentPresence } from "../../types/Presence";
import { useState } from "react";
import { fetchPresenceData, savePresenceData } from "../../utils/presenceUtils";

const PresenceStatsCard = ({title, value} : {title: string, value: number}) => {
    return (
        <div className="shadow-hard rounded-lg flex flex-col w-20 h-20 justify-center items-center shrink-0">
            <h3 className="text-text-100 text-heading-4 font-semibold text-center">{value}</h3>
            <h3 className="text-neutral-900 text-paragraph-3 font-medium text-center">{title}</h3>
        </div>
    );
}

const PresenceStats = ({presenceClass} : {presenceClass : PresenceClass}) => {
    const notYetStudents = presenceClass.students.filter(student => student.status === 'Not Yet').length;
    const absentStudents = presenceClass.students.filter(student => student.status === 'Absent').length;
    const sickStudents = presenceClass.students.filter(student => student.status === 'Sick').length;
    const permittedStudents = presenceClass.students.filter(student => student.status === 'Permitted').length;
    const presentStudents = presenceClass.students.filter(student => student.status === 'Present').length;

    return (
        <div className="flex gap-5 overflow-auto whitespace-nowrap pb-4">
            <PresenceStatsCard title="Belum" value={notYetStudents}/>
            <PresenceStatsCard title="Hadir" value={presentStudents}/>
            <PresenceStatsCard title="Absen" value={absentStudents}/>
            <PresenceStatsCard title="Sakit" value={sickStudents}/>
            <PresenceStatsCard title="Izin" value={permittedStudents}/>
        </div>
    );
}

interface StudentPresenceCardProps {
    student: StudentPresence;
    onStatusChange: (studentId: number, newStatus: PresenceStatus) => void;
}

const StudentPresenceCard = ({student, onStatusChange} : StudentPresenceCardProps) => {
    const [status, setStatus] = useState(student.status);

    const toggleStatus = (newStatus : PresenceStatus) => {
        let appliedStatus = status;
        if (status === newStatus) {
            appliedStatus = PresenceStatus.NOT_YET;
        } else {
            appliedStatus = newStatus;
        }

        onStatusChange(student.id, appliedStatus);
        setStatus(appliedStatus);
    }

    return (
        <div className="flex flex-col w-full p-5 shadow-hard rounded-lg gap-3">
            <div className="flex items-center w-full gap-4">
                <img src="https://i.pinimg.com/736x/c9/33/6f/c9336f3f0a0160c3e2d0e18c7d096b73.jpg" alt={student.name} className="w-12 h-12 rounded-full"/>
                <h3 className="text-text-100 text-heading-4 font-semibold">{student.name}</h3>
            </div>
            <div className="flex gap-2 w-full justify-between items-center">
                <button 
                    className={`w-1/2 py-1.5 px-2  border-presence-red border-2 
                    font-semibold rounded-xl text-label-4
                    ${status === PresenceStatus.ABSENT ? 'bg-presence-red text-white' : 'text-presence-red'}`}
                    onClick={() => toggleStatus(PresenceStatus.ABSENT)}
                >
                    Absen
                </button> 
                <button 
                    className={`w-1/2 py-1.5 px-2 border-presence-yellow border-2 
                    font-semibold rounded-xl text-label-4
                    ${status === PresenceStatus.SICK ? 'bg-presence-yellow text-white' : 'text-presence-yellow'}`}
                    onClick={() => toggleStatus(PresenceStatus.SICK)}
                >
                    Sakit
                </button>
                <button 
                    className={`w-1/2 py-1.5 px-2 border-presence-blue border-2 
                    font-semibold rounded-xl text-label-4
                    ${status === PresenceStatus.PERMITTED ? 'bg-presence-blue text-white' : 'text-presence-blue'}`}
                    onClick={() => toggleStatus(PresenceStatus.PERMITTED)}
                >
                    Izin
                </button>
                <button 
                    className={`w-1/2 py-1.5 px-2 border-presence-green border-2 
                    font-semibold rounded-xl text-label-4
                    ${status === PresenceStatus.PRESENT ? 'bg-presence-green text-white' : 'text-presence-green'}`}
                    onClick={() => toggleStatus(PresenceStatus.PRESENT)}
                >
                    Hadir
                </button>
            </div>
        </div>
    );
}

interface PresenceTabProps {
    activityId: number;
    presenceData?: PresenceData;
    onPresenceDataChange: (data: PresenceData) => void;
}

const PresenceTab = (props : PresenceTabProps) => {
    const [selectedClass, setSelectedClass] = useState('0');
    const handleSelectedClassChange = (e : SelectChangeEvent) => {
        setSelectedClass(e.target.value);
    }

    const [isChangesSaved, setIsChangesSaved] = useState(true);
    const [changedIds, setChangedIds] = useState<number[]>([]);

    const handleStudentStatusChange = (studentId: number, newStatus: PresenceStatus) => {
        const newPresenceData = [...props.presenceData!];
        const classIndex = parseInt(selectedClass);
        const studentIndex = newPresenceData[classIndex].students.findIndex(student => student.id === studentId);
        newPresenceData[classIndex].students[studentIndex].status = newStatus;
        setIsChangesSaved(false);
        if (!changedIds.includes(studentId))
            setChangedIds([...changedIds, studentId]);
        props.onPresenceDataChange(newPresenceData);
    }

    if (!props.presenceData) {
        fetchPresenceData(props.activityId)
            .then(data => props.onPresenceDataChange(data))
            .catch(err => {
                console.error(err);   
                props.onPresenceDataChange([]);
            });
        
        return <div>Loading...</div>;
    }

    const data : PresenceData = props.presenceData;

    return (
        <div className="flex flex-col mt-5 gap-5 w-5/6 mx-auto">
            <FormControl>
                <Select
                    value={selectedClass}
                    onChange={handleSelectedClassChange} 
                    className="bg-cobalt6 rounded-full"
                >
                    {data?.map((presenceClass, index) => (
                        <MenuItem key={index} value={index}>
                            {presenceClass.classTitle}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <PresenceStats presenceClass={data[parseInt(selectedClass)]}/>
            <button className="bg-persian-blue-500 text-neutral8 rounded-xl py-2 font-semibold disabled:opacity-50" disabled={isChangesSaved}
                onClick={() => { 
                    savePresenceData(props.activityId, data, changedIds).then(() => {
                        setIsChangesSaved(true);
                        setChangedIds([]);
                    })
                }}
            >
                Simpan
            </button>
            {
                data[parseInt(selectedClass)].students.map((student) => (
                    <StudentPresenceCard 
                        key={student.id} student={student}
                        onStatusChange={handleStudentStatusChange}    
                    />
                ))
            }
        </div>
    );
}

export default PresenceTab;