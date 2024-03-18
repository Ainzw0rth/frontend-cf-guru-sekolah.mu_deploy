import KegiatanCard from "../components/KegiatanCard";
import { Kegiatan } from "../types/Kegiatan";
import Breadcrumb from "../components/Breadcrumb";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import React from "react";
import cloudland from '../assets/cloud_land.svg';
import 'dayjs/locale/id';

dayjs.extend(utc);
dayjs.extend(timezone);

const kegiatans: Kegiatan[] = [
    {
      id: 1,
      title: 'Kegiatan 1',
      date: '2021-12-31',
      time: '08:00',
      class: 'XII RPL 1',
      program: 'Program 1',
      topic: 'Pemrograman Berorientasi Objek',
      imageUrl: 'https://via.placeholder.com/300',
      taskPercentage: 10,
    },
    {
      id: 2,
      title: 'Kegiatan 2',
      date: '2021-12-31',
      time: '08:00',
      class: 'XII RPL 1',
      program: 'Program 1',
      topic: 'Pemrograman Berorientasi Objek',
      imageUrl: 'https://via.placeholder.com/300',
      taskPercentage: 50,
    },
    {
      id: 3,
      title: 'Kegiatan 3',
      date: '2021-12-31',
      time: '08:00',
      class: 'XII RPL 1',
      program: 'Program 1',
      topic: 'Pemrograman Berorientasi Objek',
      imageUrl: 'https://via.placeholder.com/300',
      taskPercentage: 80,
    },
    // Add more kegiatans as needed
  ];

  const kegiatans1: Kegiatan[] = [
    {
      id: 1,
      title: 'Kegiatan 4',
      date: '2021-12-31',
      time: '08:00',
      class: 'XII RPL 1',
      program: 'Program 1',
      topic: 'Pemrograman Berorientasi Objek',
      imageUrl: 'https://via.placeholder.com/300',
      taskPercentage: 10,
    },
    {
      id: 2,
      title: 'Kegiatan 5',
      date: '2021-12-31',
      time: '08:00',
      class: 'XII RPL 1',
      program: 'Program 1',
      topic: 'Pemrograman Berorientasi Objek',
      imageUrl: 'https://via.placeholder.com/300',
      taskPercentage: 50,
    },
    {
      id: 3,
      title: 'Kegiatan 6',
      date: '2021-12-31',
      time: '08:00',
      class: 'XII RPL 1',
      program: 'Program 1',
      topic: 'Pemrograman Berorientasi Objek',
      imageUrl: 'https://via.placeholder.com/300',
      taskPercentage: 80,
    },
    // Add more kegiatans as needed
  ];

  const kegiatansTanggal = [
    {
      date: dayjs('2024-03-18').utc(),
      kegiatans: kegiatans
    },
    {
      date: dayjs('2024-03-19').utc(),
      kegiatans: kegiatans1
    }
  ];

const breadcrumb = [
    {label: 'Home', link: '/'},
    {label: 'Jadwal', link: `/Jadwal`}
];


const Schedule = () => {
    const [selectedDay, setSelectedDay] = React.useState<Dayjs | null>(dayjs().utc());
    const [kegiatans, setKegiatans] = React.useState<Kegiatan[]>([]);

    React.useEffect(() => {
      if (selectedDay) {
        const filteredKegiatans = kegiatansTanggal.find(item => selectedDay.isSame(item.date, 'day'));
        if (filteredKegiatans) {
          setKegiatans(filteredKegiatans.kegiatans);
        } else {
          setKegiatans([]);
        }
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
              value={selectedDay} onChange={(newSelectedDay) => setSelectedDay(newSelectedDay)} 
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
}


export default Schedule;