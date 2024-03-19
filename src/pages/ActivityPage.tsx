import { useState } from "react";
import ProgramBanner from "../components/ProgramBanner";

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

const TAB = {
    INSTRUKSI: 0,
    MATERI: 1,
    PRESENSI: 2,
    EVALUASI: 3,
    HASIL_KARYA: 4
}

const TAB_ELEMENT = [
    {id: TAB.INSTRUKSI, element: <div className="w-full flex justify-center mt-20 text-3xl">Instruksi</div>},
    {id: TAB.MATERI, element: <div className="w-full flex justify-center mt-20 text-3xl">Materi</div>},
    {id: TAB.PRESENSI, element: <div className="w-full flex justify-center mt-20 text-3xl">Presensi</div>},
    {id: TAB.EVALUASI, element: <div className="w-full flex justify-center mt-20 text-3xl">Evaluasi</div>},
    {id: TAB.HASIL_KARYA, element: <div className="w-full flex justify-center mt-20 text-3xl">Hasil Karya</div>}
]

const ActivityPage = () => {
    const [openTab, setOpenTab] = useState(TAB.INSTRUKSI);    

    return (
    <main className="flex flex-col">
        <ProgramBanner imgUrl="https://source.unsplash.com/1600x900/?nature,water" judul="Kegiatan Belajar"/>
        <nav className="flex px-5 overflow-auto whitespace-nowrap pb-4 gap-4">
            <ActivityTab active={openTab == TAB.INSTRUKSI} title="Instruksi" onClick={() => setOpenTab(TAB.INSTRUKSI)}/>
            <ActivityTab active={openTab == TAB.MATERI} title="Materi" onClick={() => setOpenTab(TAB.MATERI)}/>
            <ActivityTab active={openTab == TAB.PRESENSI} title="Presensi" onClick={() => setOpenTab(TAB.PRESENSI)}/>
            <ActivityTab active={openTab == TAB.EVALUASI} title="Evaluasi" onClick={() => setOpenTab(TAB.EVALUASI)}/>
            <ActivityTab active={openTab == TAB.HASIL_KARYA} title="Hasil Karya" onClick={() => setOpenTab(TAB.HASIL_KARYA)}/>            
        </nav>
        {
            TAB_ELEMENT.find((tab) => tab.id === openTab)?.element
        }
    </main>
    );
}

export default ActivityPage;