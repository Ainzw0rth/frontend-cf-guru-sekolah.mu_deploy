import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { STUDENT_PRESENCE } from "../../data/studentPresence";
import { PresenceData, StudentPresence } from "../../types/Presence";
import { useState } from "react";

interface PresenceTabProps {
    activityId: number;
    presenceData?: PresenceData;
    onPresenceDataChange: (data: PresenceData) => void;
}

const fetchPresenceData = (activityId : number) => {
    console.log(`Fetching presence data for activity ${activityId}`);
    return STUDENT_PRESENCE;
}

const StudentPresenceCard = ({student} : {student: StudentPresence}) => {
    return (
        <div className="flex flex-col w-5/6 p-5 shadow-hard rounded-lg">
            <div className="flex items-center w-full gap-6">
                <img src={student.imgUrl} alt={student.name} className="w-12 h-12 rounded-full"/>
                <h3 className="text-text-100 text-heading-4 font-semibold">{student.name}</h3>
            </div>
            <div>

            </div>
        </div>
    );

}

const PresenceTab = (props : PresenceTabProps) => {
    const [selectedClass, setSelectedClass] = useState('0');
    const handleSelectedClassChange = (e : SelectChangeEvent) => {
        setSelectedClass(e.target.value);
    }

    if (!props.presenceData) {
        props.onPresenceDataChange(fetchPresenceData(props.activityId));
        return <div>Loading...</div>;
    }

    const data : PresenceData = props.presenceData;

    return (
        <div className="flex flex-col items-center mt-5 gap-5">
            <FormControl className="w-5/6">
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
            {
                data[parseInt(selectedClass)].students.map((student, index) => (
                    <StudentPresenceCard key={index} student={student}/>
                ))
            }
        </div>
    );
}

export default PresenceTab;