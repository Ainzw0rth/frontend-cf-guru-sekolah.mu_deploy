import { useState } from "react";
import { PresenceStatus } from "../../types/Presence";

interface BulkEditPresencePopUpProps {
    onPopUpDone: (status: PresenceStatus) => void;
}

const BulkEditPresencePopUp = (props: BulkEditPresencePopUpProps) => {
    const [status, setStatus] = useState<PresenceStatus>(PresenceStatus.NOT_YET);
        
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-3/4 flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-center">Ubah Status Kehadiran</h2>
                <div className="flex gap-2 w-full justify-between items-center">
                    <button 
                        className={`w-1/2 py-1.5 px-2  border-presence-red border-2 
                        font-semibold rounded-xl text-label-4
                        ${status === PresenceStatus.ABSENT ? 'bg-presence-red text-white' : 'text-presence-red'}`}
                        onClick={() => setStatus(PresenceStatus.ABSENT)}
                    >
                        Absen
                    </button> 
                    <button 
                        className={`w-1/2 py-1.5 px-2 border-presence-yellow border-2 
                        font-semibold rounded-xl text-label-4
                        ${status === PresenceStatus.SICK ? 'bg-presence-yellow text-white' : 'text-presence-yellow'}`}
                        onClick={() => setStatus(PresenceStatus.SICK)}
                    >
                        Sakit
                    </button>
                    <button 
                        className={`w-1/2 py-1.5 px-2 border-presence-blue border-2 
                        font-semibold rounded-xl text-label-4
                        ${status === PresenceStatus.PERMITTED ? 'bg-presence-blue text-white' : 'text-presence-blue'}`}
                        onClick={() => setStatus(PresenceStatus.PERMITTED)}
                    >
                        Izin
                    </button>
                    <button 
                        className={`w-1/2 py-1.5 px-2 border-presence-green border-2 
                        font-semibold rounded-xl text-label-4
                        ${status === PresenceStatus.PRESENT ? 'bg-presence-green text-white' : 'text-presence-green'}`}
                        onClick={() => setStatus(PresenceStatus.PRESENT)}
                    >
                        Hadir
                    </button>
                </div>
                <div className="text-center relative">
                    <button onClick={() => props.onPopUpDone(status)} 
                        className={`bg-indigo-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-500 
                        transition duration-300`}
                    >
                        Selesai
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BulkEditPresencePopUp;