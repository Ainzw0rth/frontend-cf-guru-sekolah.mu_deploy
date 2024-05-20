import { useState, useEffect } from "react";
import { Activity } from "../types/Activity";
import KegiatanCard from "../components/KegiatanCard";
import Breadcrumb from "../components/Breadcrumb";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/id';
import cloudland from '../assets/cloud_land.svg';
import { BASE_URL } from "../const";
import { getTeacherId } from "../utils/authUtils";

dayjs.extend(utc);
dayjs.extend(timezone);

const breadcrumb = [
    {label: 'Home', link: '/'},
    {label: 'Jadwal', link: `/Jadwal`}
];

const SchedulePage = () => {
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(dayjs().utc());
    const [kegiatans, setKegiatans] = useState<Activity[]>([]);
    const idGuru = getTeacherId();

    useEffect(() => {
        const fetchKegiatans = async () => {
            try {
                const formattedDate = selectedDay?.format('YYYY-MM-DD');
                const response = await fetch(`${BASE_URL}/kegiatan/tanggal?tanggal=${formattedDate}&id=${idGuru}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch kegiatans');
                }
                const data = await response.json();

                if (!data.data) { 
                    setKegiatans([]);
                    return;
                }


                const formattedKegiatans = data.data.map((kegiatanData: any) => ({
                    id: kegiatanData.id_kegiatan,
                    title: kegiatanData.nama_kegiatan,
                    class: kegiatanData.nama_kelas || '', 
                    program: kegiatanData.nama_program || '',
                    topic: kegiatanData.nama_topik || '', 
                    date: kegiatanData.tanggal || '',
                    time: kegiatanData.waktu.slice(0, 5) || '',
                    taskPercentage: Math.floor(Math.random() * (100 + 1)),
                }));

                setKegiatans(formattedKegiatans);
            } catch (error) {
                console.error('Failed to fetch kegiatans', error);
            }
        };

        if (selectedDay) {
            fetchKegiatans();
        }
    }, [selectedDay]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex justify-center flex-col" style={{backgroundImage: `url(${cloudland})`, backgroundRepeat: 'no-repeat', backgroundPosition: '0% 95%', backgroundSize: 'contain', backgroundAttachment: 'fixed'}}>
                <div className="sticky top-20 w-full z-50">
                    <Breadcrumb items={breadcrumb} />
                </div>
                <div className="max-[390px]:p-5 p-10 flex-1">
                    <DateCalendar
                        value={selectedDay} 
                        onChange={(newSelectedDay) => setSelectedDay(newSelectedDay)} 
                        views={['year', 'month', 'day']}
                    />
                    <div className="bg-persian-blue-500 w-24 h-2 rounded-full my-5" />
                    <h1 className='font-bold text-program-title text-text-100'>{selectedDay?.locale('id').format('dddd, D MMMM YYYY')}</h1>
                    {kegiatans.length === 0 ? (
                        <div className="flex justify-center items-center my-4">
                            <p className="my-24">Tidak ada kegiatan hari ini</p>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center my-4">
                            {kegiatans.map((kegiatan) => (
                                <KegiatanCard key={kegiatan.id} kegiatan={kegiatan} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </LocalizationProvider>
    );
};

export default SchedulePage;
