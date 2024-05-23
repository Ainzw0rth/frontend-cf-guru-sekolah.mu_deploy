/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudland from '../assets/cloud_land.svg';
import Breadcrumb from "../components/Breadcrumb";
// import banner from '../assets/profile_banner.jpg';
import KegiatanPendingTaskCard from '../components/KegiatanPendingTaskCard';
import { useEffect, useState } from 'react';
import { Activity } from '../types/Activity';
import { getTeacherId } from '../utils/authUtils';
import { BASE_URL } from '../const';
import { Skeleton } from '@mui/material';

const breadcrumb = [
    {label: 'Home', link: '/'},
    {label: 'Pending', link: `/Pending`}
];

const PendingPage = () => {
    const [pending, setPending] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPending = async () => {
            setLoading(true);
            try{
                const response = await fetch(`${BASE_URL}/tugastertunda/all?id_guru=${getTeacherId()}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch pending tasks');
                }

                const resJson = await response.json();
                const formattedPending = await Promise.all(resJson.data.map(async (kegiatanData: any) => {
                    let taskPercentage;
                    await fetch(`${BASE_URL}/kegiatan/percentage?id=${kegiatanData.id_kegiatan}`)
                    .then(response => response.json())
                    .then(data => {
                        const totalData = (data.data[0].total_rows * 4);
                        const unfinishedData = (data.data[0].null_catatan_kehadiran*1 + data.data[0].null_penilaian*1 + data.data[0].null_catatan*1 + data.data[0].null_feedback*1);
                        taskPercentage = Math.floor((((totalData ?? 0) - (unfinishedData ?? 0)) / (totalData ?? 1)) * 100)
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                    return {
                        id: kegiatanData.id_kegiatan,
                        title: kegiatanData.nama_kegiatan,
                        class: kegiatanData.nama_kelas || '',
                        program: kegiatanData.nama_program || '',
                        topic: kegiatanData.nama_topik || '',
                        date: kegiatanData.tanggal || '',
                        time: kegiatanData.waktu.slice(0, 5) || '',
                        taskPercentage: taskPercentage ?? 0,
                    };
                }));
                setPending(formattedPending);

            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        fetchPending();
    }, []);

    return (
        <div className='justify-center fill' style={{
            backgroundImage: `url(${cloudland})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0% 100%',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
            }}>

            <div className="sticky top-20 w-full z-50">
                <Breadcrumb items={breadcrumb} />
            </div>
            <div className="max-[390px]:p-5 p-10 flex-1">
                {loading ? (
                    <div className="flex flex-col justify-center items-center my-4">
                        <Skeleton variant="rounded" width={300} height={200} sx={{ marginTop: 1, marginBottom: 1}} />
                        <Skeleton variant="rounded" width={300} height={200} sx={{ marginTop: 1, marginBottom: 1}} />
                        <Skeleton variant="rounded" width={300} height={200} sx={{ marginTop: 1, marginBottom: 1}} />
                    </div>
                ):(
                    pending.length === 0 ? (
                        <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center'>
                            <p className='my-24'>Tidak ada tugas yang tertunda! Selamat!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center my-4">
                            {pending.map((kegiatan) => (
                                <KegiatanPendingTaskCard key={kegiatan.id} kegiatan={kegiatan} />
                            ))}
                        </div>
                    )
                )
                }
            </div>
        </div>

    );
};

export default PendingPage;