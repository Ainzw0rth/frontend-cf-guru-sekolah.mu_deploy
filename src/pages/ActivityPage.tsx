import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PresenceTab from "../components/tabs/PresenceTab";
import EvaluationTab from '../components/tabs/EvaluationTab';
import InstructionTab from '../components/tabs/InstructionTab';
import MaterialTab from "../components/tabs/MaterialTab";
import StudentWorkTab from "../components/tabs/StudentsWorkTab";

import { PresenceData } from "../types/Presence";
import { EvaluationData } from "../types/Evaluation";
import { InstructionData } from "../types/Instruction";
import { MaterialData } from "../types/Material";

import LinearProgress from '@mui/material/LinearProgress';
import ProgramBanner from "../components/ProgramBanner";
import { BASE_URL } from "../const";
import { StudentWorkData } from "../types/StudentWork";

// #region tab components
interface ActivityTabItemProps {
    active: boolean;
    title: string;
    onClick: () => void;
}

const ActivityTabItem = (props : ActivityTabItemProps) => {
    return (
        <button 
            className={`w-1/2 py-1 px-6 text-center rounded-3xl shadow-hard border-2 text-label-1 font-semibold
                ${ props.active ? 
                    'text-persian-blue-500 bg-persian-blue6 border-persian-blue-500' : 
                    'text-text-100 border-neutral7'}` }
            onClick={props.onClick}
        >
            {props.title}
        </button>
    );
}

const TAB = { INSTRUKSI: 0, MATERI: 1, PRESENSI: 2, EVALUASI: 3, HASIL_KARYA: 4 }

const generateTabElements = (
    activityId: number,
    presenceData: PresenceData | undefined | null,
    onPresenceDataChange: (data: PresenceData | null) => void,
    evaluationData: EvaluationData | undefined,
    onEvaluationDataChange: (dataEval: EvaluationData) => void,
    instructionData: InstructionData | undefined,
    onInstructionDataChange: (dataEval: InstructionData) => void,
    materialData: MaterialData | undefined,
    onMaterialDataChange: (data: MaterialData) => void,
    studentWorkData: StudentWorkData | undefined,
    onStudentWorkDataChange: (data: StudentWorkData) => void,
    fetchData: () => void
) => {
    return [
        {
            id: TAB.INSTRUKSI, element: 
                <InstructionTab activityId={activityId} onInstructionDataChange={(data) => onInstructionDataChange(data)} instructionData={instructionData}/>
        },
        {
            id: TAB.MATERI, element: 
                <MaterialTab activityId={activityId} onMaterialDataChange={(data) => onMaterialDataChange(data)} materialData={materialData}/>
        },
        {
            id: TAB.PRESENSI, element: 
                <PresenceTab activityId={activityId} onPresenceDataChange={(data) => onPresenceDataChange(data)} presenceData={presenceData} fetchData={fetchData}/>
        },
        {
            id: TAB.EVALUASI, element: 
                <EvaluationTab activityId={activityId} onEvaluationDataChange={(data) => onEvaluationDataChange(data)} evaluationData={evaluationData} fetchData={fetchData}/>
        },
        {
            id: TAB.HASIL_KARYA, element: 
                <StudentWorkTab activityId={activityId} onStudentWorkDataChange={(data) => onStudentWorkDataChange(data)} studentWorkData={studentWorkData}/>
        }
    ]
}
// #endregion

// #region data fetching
interface ActivityPageData {
    title: string;
    imgUrl: string;
    instruksi_murid: string[];
    instruksi_guru: string[];
    tujuan_pembelajaran: string[];
}

const fetchActivityData = async (activityId : number) : Promise<ActivityPageData> => {
    try {
        const response = await fetch(`${BASE_URL}/kegiatan/${activityId}`);
        if (!response.ok) {
            console.error('Failed to fetch activity data ' + response.statusText);
            return { title: '', imgUrl: '', instruksi_murid: [], instruksi_guru: [], tujuan_pembelajaran: [] };
        }

        const json = await response.json();
        const activityData : ActivityPageData = {
            title: json.data.nama_kegiatan,
            imgUrl: json.data.path_banner,
            instruksi_murid: json.data.instruksi_murid.split('\n'),
            instruksi_guru: json.data.instruksi_guru.split('\n'),
            tujuan_pembelajaran: json.data.tujuan_pembelajaran.split('\n')
        }
        return activityData;
    } catch (error) {
        console.error('Failed to fetch activity data ' + error);
        return { title: '', imgUrl: '', instruksi_murid: [], instruksi_guru: [], tujuan_pembelajaran: [] };
    }

}

// #endregion

const ActivityPage = () => {
    let activityId = -1;
    const [openTab, setOpenTab] = useState(TAB.INSTRUKSI);    

    const [presenceData, setPresenceData] = useState<PresenceData | null>();
    const storePresenceData = (data : PresenceData | null) => {
        // only get status data
        setPresenceData(data);
    }

    const [evaluationData, setEvaluationData] = useState<EvaluationData>();
    const storeEvaluationData = (dataEval : EvaluationData) => {
        setEvaluationData(dataEval);
    }

    const [instructionData, setInstructionData] = useState<InstructionData>();
    const storeInstructionData = (data : InstructionData) => { 
        setInstructionData(data);
    }

    const [materialData, setMaterialData] = useState<MaterialData>();
    const storeMaterialData = (data : MaterialData) => {
        setMaterialData(data);
    }

    const [studentWorkData, setStudentWorkData] = useState<StudentWorkData>();
    const storeStudentWorkData = (data : StudentWorkData) => {
        setStudentWorkData(data);
    }

    const [activityData, setActivityData] = useState<ActivityPageData>({ 
        title: '', imgUrl: '', instruksi_murid: [], instruksi_guru: [], tujuan_pembelajaran: []
    });

    const [totalData, setTotalData] = useState<number | null>(null);
    const [unfinishedData, setUnfinishedData] = useState<number | null>(null);
    const [progressValue, setProgressValue] = useState(0);

    const fetchData = async (activityId: number) => {
        if (!activityId) { return; }
    
        try {
            const response = await fetch(`${BASE_URL}/kegiatan/percentage?id=` + activityId);
            const data = await response.json();
            setTotalData(data.data[0].total_rows * 4);
            setUnfinishedData(data.data[0].null_catatan_kehadiran*1 + data.data[0].null_penilaian*1 + data.data[0].null_catatan*1 + data.data[0].null_feedback*1);
        } catch (error) {
            console.error('Error:', error);
        }
    
        try {
            const data = await fetchActivityData(activityId);
            setActivityData(data);
            setInstructionData({ 
                instruksiMurid: data.instruksi_murid, 
                instruksiGuru: data.instruksi_guru, 
                tujuanPembelajaran: data.tujuan_pembelajaran 
            });
        } catch (err) {
            console.error(err);
            setActivityData({ title: '', imgUrl: '', instruksi_murid: [], instruksi_guru: [], tujuan_pembelajaran: [] });
        }
    }
    
    useEffect(() => {
        fetchData(activityId);
    }, [activityId]);

    useEffect(() => {
        const value = Math.floor((((totalData ?? 0) - (unfinishedData ?? 0)) / (totalData ?? 1)) * 100);
        setProgressValue(value);
    }, [totalData, unfinishedData]); 

    const { id } = useParams();
    if (!id) { return <div>Invalid Activity ID</div>; }
    activityId = parseInt(id);

    const tabElements = generateTabElements(
        activityId,
        presenceData,
        storePresenceData,
        evaluationData,
        storeEvaluationData,
        instructionData,
        storeInstructionData,
        materialData,
        storeMaterialData,
        studentWorkData,
        storeStudentWorkData,
        () => fetchData(activityId)
    );

    return (
    <div>
        <main className="flex flex-col">
            {
                activityData.title === ''?(
                    <ProgramBanner imgUrl={'src/assets/cloud_land.svg'} judul={activityData.title}/>
                ):(
                    <ProgramBanner imgUrl={activityData.imgUrl} judul={activityData.title}/>

                )
            }
            <nav className="flex px-5 overflow-auto whitespace-nowrap pb-4 gap-4">
                <ActivityTabItem active={openTab == TAB.INSTRUKSI} title="Instruksi" onClick={() => setOpenTab(TAB.INSTRUKSI)}/>
                <ActivityTabItem active={openTab == TAB.MATERI} title="Materi" onClick={() => setOpenTab(TAB.MATERI)}/>
                <ActivityTabItem active={openTab == TAB.PRESENSI} title="Presensi" onClick={() => setOpenTab(TAB.PRESENSI)}/>
                <ActivityTabItem active={openTab == TAB.EVALUASI} title="Evaluasi" onClick={() => setOpenTab(TAB.EVALUASI)}/>
                <ActivityTabItem active={openTab == TAB.HASIL_KARYA} title="Hasil Karya" onClick={() => setOpenTab(TAB.HASIL_KARYA)}/>            
            </nav>
            {
                tabElements.find((tab) => tab.id === openTab)?.element
            }
        </main>
        <div className="h-8 w-full max-w-screen-sm mx-auto">{/* whitespace for the elements covered by navbar */}</div>
        <div className="w-full shadow-hard-top rounded-t-3xl fixed bottom-20 bg-white max-w-screen-sm mx-auto z-10">
            <div className="pt-4 flex items-center mx-10 gap-10">
                <LinearProgress
                    variant="determinate"
                    value={progressValue}
                    className='rounded-lg shadow-md flex-grow'
                    sx={{
                        height: '10px',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#2325ba',
                        },
                    }}
                />
                <p className='text-text-100 text-right ml-2'>{progressValue}%</p>
            </div>
        </div>
    </div>
    );
}

export default ActivityPage;
