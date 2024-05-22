/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudland from '../assets/cloud_land.svg';
import Breadcrumb from "../components/Breadcrumb";
// import banner from '../assets/profile_banner.jpg';
import KegiatanPendingTaskCard from '../components/KegiatanPendingTaskCard';
import { useEffect, useState } from 'react';
import { Activity } from '../types/Activity';
import { getTeacherId } from '../utils/authUtils';
import { BASE_URL } from '../const';

const breadcrumb = [
    {label: 'Home', link: '/'},
    {label: 'Pending', link: `/Pending`}
];

const PendingPage = () => {
    const [pending, setPending] = useState<Activity[]>([]);

    useEffect(() => {
        const fetchPending = async () => {
            try{
                console.log(getTeacherId());

                const response = await fetch(`${BASE_URL}/tugastertunda/all?id_guru=${getTeacherId()}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch pending tasks');
                }

                console.log(response.status);

                const resJson = await response.json();

                console.log(resJson.data);
                
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
                {pending.length === 0 ? (
                    <div className='flex justify-center items-center my-4'>
                        <p className='my-24'>Tidak ada tugas yang tertunda! Selamat!</p>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center my-4">
                        {pending.map((kegiatan) => (
                            <KegiatanPendingTaskCard key={kegiatan.id} kegiatan={kegiatan} />
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default PendingPage;