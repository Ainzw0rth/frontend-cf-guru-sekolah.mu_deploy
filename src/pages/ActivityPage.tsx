import { useState } from "react";
import ProgramBanner from "../components/ProgramBanner";
import PresenceTab from "../components/tabs/PresenceTab";
import EvaluationTab from '../components/tabs/EvaluationTab';
import InstructionTab from '../components/tabs/InstructionTab';
import { PresenceData } from "../types/Presence";
import { EvaluationData } from "../types/Evaluation";
import { InstructionData } from "../types/Instruction";
import { useParams } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';

interface ActivityTabProps {
    active: boolean;
    title: string;
    onClick: () => void;
}

const ActivityTab = (props : ActivityTabProps) => {
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
    presenceData: PresenceData | undefined,
    onPresenceDataChange: (data: PresenceData) => void,
    evaluationData: EvaluationData | undefined,
    onEvaluationDataChange: (dataEval: EvaluationData) => void,
    instructionData: InstructionData | undefined,
    onInstructionDataChange: (dataEval: InstructionData) => void
) => {
    return [
        {
            id: TAB.INSTRUKSI, element: 
                <InstructionTab activityId={activityId} onInstructionDataChange={(data) => onInstructionDataChange(data)} instructionData={instructionData}/>
        },
        {
            id: TAB.MATERI, element: 
                <div className="w-full flex justify-center mt-20 text-3xl">Materi</div>},
        {
            id: TAB.PRESENSI, element: 
                <PresenceTab activityId={activityId} onPresenceDataChange={(data) => onPresenceDataChange(data)} presenceData={presenceData}/>
        },
        {
            id: TAB.EVALUASI, element: 
                <EvaluationTab activityId={activityId} onEvaluationDataChange={(data) => onEvaluationDataChange(data)} evaluationData={evaluationData}/>
        },
        {
            id: TAB.HASIL_KARYA, element: 
            <div className="w-full flex justify-center mt-20 text-3xl">Hasil Karya</div>
        }
    ]
}

const ActivityPage = () => {
    const [openTab, setOpenTab] = useState(TAB.INSTRUKSI);    

    const [presenceData, setPresenceData] = useState<PresenceData>();
    const storePresenceData = (data : PresenceData) => {
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

    const { id } = useParams();
    if (!id) { return <div>Invalid Activity ID</div>; }
    const activityId = parseInt(id);

    const tabElements = generateTabElements(
        activityId,
        presenceData,
        storePresenceData,
        evaluationData,
        storeEvaluationData,
        instructionData,
        storeInstructionData
    );
    return (
    <div>
        <main className="flex flex-col">
            <ProgramBanner imgUrl="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/1000081242.jpg" judul="Belajar Baris Berbaris"/>
            <nav className="flex px-5 overflow-auto whitespace-nowrap pb-4 gap-4">
                <ActivityTab active={openTab == TAB.INSTRUKSI} title="Instruksi" onClick={() => setOpenTab(TAB.INSTRUKSI)}/>
                <ActivityTab active={openTab == TAB.MATERI} title="Materi" onClick={() => setOpenTab(TAB.MATERI)}/>
                <ActivityTab active={openTab == TAB.PRESENSI} title="Presensi" onClick={() => setOpenTab(TAB.PRESENSI)}/>
                <ActivityTab active={openTab == TAB.EVALUASI} title="Evaluasi" onClick={() => setOpenTab(TAB.EVALUASI)}/>
                <ActivityTab active={openTab == TAB.HASIL_KARYA} title="Hasil Karya" onClick={() => setOpenTab(TAB.HASIL_KARYA)}/>            
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
                value={Math.floor(70)}
                className='rounded-lg shadow-md flex-grow'
                sx={{
                    height: '10px',
                    '& .MuiLinearProgress-bar': {
                    backgroundColor: '#2325ba',
                    },
                }}
                />
                <p className='text-text-100 text-right ml-2'>{Math.floor(70)}%</p>
            </div>
        </div>
    </div>
    );
}

export default ActivityPage;