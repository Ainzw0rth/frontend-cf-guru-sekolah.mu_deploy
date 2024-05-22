/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Confetti from 'react-confetti';
import { BASE_URL } from "../../const";

interface Badge {
    id_badge: number;
    nama_badge: string;
    deskripsi: string;
    path_badge: string;
}

interface NewBadgeNotifierProps {
    idGuru: number;
}

const fetchBadge = async (idGuru: number) : Promise<Badge[]>  => {
    const response = await fetch(`${BASE_URL}/profil/badges/${idGuru}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch badges');
    }
    const resJson = await response.json();
    return resJson.data;
};


const NewBadgeNotifier: React.FC<NewBadgeNotifierProps> = ({ idGuru }) => {
    const [open, setOpen] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [newBadges, setNewBadges] = useState<Badge[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const currBadges = await fetchBadge(idGuru);
            console.log("currBadges", currBadges);
            const prevBadgesJSON = localStorage.getItem('badges');
            const prevBadges = prevBadgesJSON ? JSON.parse(prevBadgesJSON) : currBadges;
            console.log("prevBadges", prevBadges);
            const newBadges = currBadges.filter((currBadge: { id_badge: any; }) => (
                !prevBadges.some((prevBadge: { id_badge: any; }) => prevBadge.id_badge === currBadge.id_badge)
            ));  
            console.log("newBadge", newBadges);
            setNewBadges(newBadges);
            if (newBadges.length > 0) {
                setOpen(true);
                setShowConfetti(true);
            }
            localStorage.setItem('badges', JSON.stringify(currBadges));
        };

        fetchTasks();
    }, [idGuru]);

    const handleClose = () => {
        setOpen(false);
        setShowConfetti(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogActions>
                    <IconButton size="medium" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="medium" />
                    </IconButton>
                </DialogActions>
                <DialogTitle className="text-center">Selamat, kamu dapat badge baru!</DialogTitle>
                <DialogContent>
                    <div className="flex flex-row items-center justify-center mx-10">
                        {newBadges.map((badge, index) => (
                            <div key={index} className="flex flex-col items-center justify-center mb-4">
                                <img src={badge.path_badge}/>
                                <h1 className="text-heading-3 font-semibold m-4">{badge.nama_badge}</h1>
                                <p className="text-center">{badge.deskripsi}</p>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
            {showConfetti && <Confetti />}
        </>
    );
};

export default NewBadgeNotifier;
