import { useEffect, useState } from "react";
import { SwipeableDrawer, IconButton } from "@mui/material";
import { BASE_URL } from "../../const";
import cikaPath from '../../assets/cika.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MaximizeIcon from '@mui/icons-material/Maximize';

interface PendingTaskNotifierProps {
    idGuru: number;
}

const fetchTasks = async (endpoint: string, taskType: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${taskType} tasks`);
    }
    const resJson = await response.json();
    return resJson.data.map((task: any) => ({ ...task, task_type: taskType }));
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
};

const PendingTaskNotifier: React.FC<PendingTaskNotifierProps> = ({ idGuru }) => {
    const [open, setOpen] = useState(false);
    const [notifContent, setNotifContent] = useState<{
        nama_murid: string,
        id_kegiatan: number,
        nama_kegiatan: string,
        tanggal: string,
        task_type: string
    } | null>(null);
    const [kegiatanUrl, setKegiatanUrl] = useState('');

    useEffect(() => {
        const checkPendingTasks = async () => {
            const unpresenced = fetchTasks(`/tugastertunda/unpresenced?id_guru=${idGuru}`, 'presensi');
            const ungraded = fetchTasks(`/tugastertunda/ungraded?id_guru=${idGuru}`, 'penilaian');
            const uncommented = fetchTasks(`/tugastertunda/uncommented?id_guru=${idGuru}`, 'catatan');
            const unfeedbacked = fetchTasks(`/tugastertunda/unfeedbacked?id_guru=${idGuru}`, 'feedback');

            const currTime = new Date().getTime();
            const eightHoursInMillis = 1000;

            let prevNextNotif: string | null = localStorage.getItem('nextNotif');
            let nextNotif: number;

            if (!prevNextNotif) {
                nextNotif = currTime;
                localStorage.setItem('nextNotif', nextNotif.toString());
            } else {
                nextNotif = parseInt(prevNextNotif, 10);
            }

            Promise.all([unpresenced, ungraded, uncommented, unfeedbacked])
                .then(([unpresencedData, ungradedData, uncommentedData, unfeedbackedData]) => {
                    const allData = [...unpresencedData, ...ungradedData, ...uncommentedData, ...unfeedbackedData];
                    if (allData.length > 0 && currTime >= nextNotif) {
                        const randomIndex = Math.floor(Math.random() * allData.length);
                        setNotifContent(allData[randomIndex]);
                        setOpen(true);
                        setKegiatanUrl(`/activity/${allData[randomIndex].id_kegiatan}`);
                        nextNotif = currTime + eightHoursInMillis;
                        localStorage.setItem('nextNotif', nextNotif.toString());
                    }
                })
                .catch(err => console.error(err));
        };

        checkPendingTasks();
        const interval = setInterval(checkPendingTasks, 1000); // Check every 5 minutes

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [idGuru]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={handleClose}
                onOpen={() => {}}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        paddingX: 5
                    }
                }}
            >
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100%' 
                }}>
                <IconButton
                    size="small"
                    color="inherit"
                    onClick={() => window.location.href = kegiatanUrl}
                >
                    <MaximizeIcon fontSize="large" style={{color: "2325ba" }}/>
                </IconButton>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding: 8, backgroundColor: '#fff', color: '#000' }}>
                    <img src={cikaPath} alt="Cika" className="m-2 w-48" />
                    <div className="flex-center">
                    <div className="text-center">
                        <span>{notifContent && (
                            <>
                                <span><strong>{notifContent.nama_murid}</strong></span> sedih nih :( <strong>{notifContent.task_type}nya</strong> belum diisi di kegiatan <br/> 
                                <span><strong>{notifContent.nama_kegiatan} ({formatDate(notifContent.tanggal)})</strong></span>
                            </>
                        )}</span>
                    </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => window.location.href = kegiatanUrl}
                        >
                            <ArrowForwardIcon fontSize="large" style={{color: "2325ba" }}/>
                        </IconButton>
                    </div>
                </div>
                </div>
            </SwipeableDrawer>
        </>
    );
};

export default PendingTaskNotifier;
