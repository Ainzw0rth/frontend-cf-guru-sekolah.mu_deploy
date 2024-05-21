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

interface PendingPageProps {
    id_jadwal: number;
    nama_kegiatan: string;
    tanggal: string;
    waktu: string;
}



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
                
                const formattedPending = resJson.data.map((kegiatanData: any) => ({
                    id: kegiatanData.id_kegiatan,
                    title: kegiatanData.nama_kegiatan,
                    class: kegiatanData.nama_kelas || '',
                    program: kegiatanData.nama_program || '',
                    topic: kegiatanData.nama_topik || '',
                    date: kegiatanData.tanggal || '',
                    time: kegiatanData.waktu.slice(0, 5) || '',
                    taskPercentage: Math.floor(Math.random() * (100 + 1)),
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
        backgroundAttachment: 'fixed'
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