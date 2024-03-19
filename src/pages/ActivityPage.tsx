import { useState } from "react";
import ProgramBanner from "../components/ProgramBanner";
import PresenceTab from "../components/tabs/PresenceTab";
import { PresenceData } from "../types/Presence";
import { useParams } from "react-router-dom";

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
    onPresenceDataChange: (data: PresenceData) => void
) => {
    return [
        {
            id: TAB.INSTRUKSI, element: 
                <div className="w-full flex justify-center mt-20 text-3xl">Instruksi</div>},
        {
            id: TAB.MATERI, element: 
                <div className="w-full flex justify-center mt-20 text-3xl">Materi</div>},
        {
            id: TAB.PRESENSI, element: 
                <PresenceTab activityId={activityId} onPresenceDataChange={(data) => onPresenceDataChange(data)} presenceData={presenceData}/>
        },
        {
            id: TAB.EVALUASI, element: 
                <div className="w-full flex justify-center mt-20 text-3xl">Evaluasi</div>
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

    const { id } = useParams();
    if (!id) { return <div>Invalid Activity ID</div>; }
    const activityId = parseInt(id);

    const tabElements = generateTabElements(activityId, presenceData, storePresenceData);

    return (
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
    );
}

export default ActivityPage;