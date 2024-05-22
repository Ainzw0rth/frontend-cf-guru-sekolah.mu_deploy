/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import SnackbarContent from '@mui/material/SnackbarContent';
import CloseIcon from '@mui/icons-material/Close';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { IconButton } from "@mui/material";
import taskIconPath from '../../assets/task_icon.png';
import Confetti from 'react-confetti'; // Import Confetti component
import { BASE_URL } from "../../const";

interface TaskCompletedNotifierProps {
    idGuru: number;
}

const fetchPendingTask = async (idGuru: number) => {
    const response = await fetch(`${BASE_URL}/tugastertunda/all?id_guru=${idGuru}`);
    if (!response.ok) {
        throw new Error('Failed to fetch pending tasks');
    }
    const resJson = await response.json();
    return resJson.data;
};

const SlideTransition = (props: any) => {
    return <Slide {...props} direction="down" />;
};

const TaskCompletedNotifier: React.FC<TaskCompletedNotifierProps> = ({ idGuru }) => {
    const [taskCompletedCount, setTaskCompletedCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false); // State to control Confetti display

    // Save the pending task length to localStorage on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            const newPendingTask = await fetchPendingTask(idGuru);
            const prevPendingTaskLength = parseInt(localStorage.getItem('pendingTaskLength') || '0', 10);
            if (newPendingTask.length < prevPendingTaskLength) {
                setTaskCompletedCount(prevPendingTaskLength - newPendingTask.length);
                setOpen(true);
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            }
            localStorage.setItem('pendingTaskLength', newPendingTask.length.toString());
        };

        fetchTasks();
    }, [idGuru]);

    const handleClose = () => {
        setOpen(false);
        setShowConfetti(false);
    };

    return (
        <>
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <SnackbarContent
                    sx={{ backgroundColor: '#5354d1', color: '#fff' }}
                    action={
                        <>
                        <IconButton size="medium" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="medium" />
                        </IconButton>
                        </>
                    }
                    message={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={taskIconPath} alt="icon" style={{ width: 48, height: 48, marginRight: 8 }} />
                            <div>Hebat! {taskCompletedCount} Tugas Tertunda kamu telah selesai!</div>
                        </div>
                    }
                />
            </Snackbar>
            {/* Render Confetti component if showConfetti is true */}
            {showConfetti && <Confetti />}
            {/* Button to trigger Confetti */}
        </>
    );
};

export default TaskCompletedNotifier;
