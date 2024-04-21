import homeBackground from '../assets/home_background.png';
import { Program } from '../types/Program';
import ProgramCarousel from '../components/ProgramCarousel';
import { Link } from 'react-router-dom';
import KegiatanCarousel from '../components/KegiatanCarousel';
import { Activity } from '../types/Activity';
import profIcon from '../assets/nav/profile.png';
import KegiatanPendingTaskCarousel from '../components/KegiatanPendingTaskCarousel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useEffect, useState } from 'react';

// const programs: Program[] = [
//     {
//       id: 1,
//       title: 'Program 1',
//       semester: 1,
//       academic_year: '2021/2022',
//       imageUrl: 'https://via.placeholder.com/300',
//     },
//     {
//       id: 2,
//       title: 'Program 2',
//       semester: 2,
//       academic_year: '2021/2022',
//       imageUrl: 'https://via.placeholder.com/300',
//     },
//     {
//       id: 3,
//       title: 'Program 3',
//       semester: 1,
//       academic_year: '2022/2023',
//       imageUrl: 'https://via.placeholder.com/300',
//     },
//     // Add more programs as needed
//   ];

// const kegiatans: Activity[] = [
//     {
//       id: 1,
//       title: 'Kegiatan 1',
//       date: '2021-12-31',
//       time: '08:00',
//       class: 'XII RPL 1',
//       program: 'Program 1',
//       topic: 'Pemrograman Berorientasi Objek',
//       imageUrl: 'https://via.placeholder.com/300',
//       taskPercentage: 10,
//     },
//     {
//       id: 2,
//       title: 'Kegiatan 2',
//       date: '2021-12-31',
//       time: '08:00',
//       class: 'XII RPL 1',
//       program: 'Program 1',
//       topic: 'Pemrograman Berorientasi Objek',
//       imageUrl: 'https://via.placeholder.com/300',
//       taskPercentage: 50,
//     },
//     {
//       id: 3,
//       title: 'Kegiatan 3',
//       date: '2021-12-31',
//       time: '08:00',
//       class: 'XII RPL 1',
//       program: 'Program 1',
//       topic: 'Pemrograman Berorientasi Objek',
//       imageUrl: 'https://via.placeholder.com/300',
//       taskPercentage: 80,
//     },
//     // Add more kegiatans as needed
//   ];

  const thisDay = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const profile = {
    name: 'Muhammad Rizqi',
    email: 'rizqimuhammad@gmail.com',
    photoUrl: 'https://via.placeholder.com/300',
  };

const HomePage = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [kegiatans, setKegiatans] = useState<Activity[]>([]);

  useEffect(() => {
    Promise.all([fetchPrograms(), fetchKegiatans()])
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch data', error);
        setIsLoading(false);
      });
}, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`https://backend-sekolah-mu-development-ainzw0rth.vercel.app/program/guru/1`);
      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }
      const data = await response.json();

      if (!data.data) {
        setPrograms([]);
        setIsLoading(false);
        return;
      }

      const formattedPrograms = data.data.map((programData: any) => ({
        id: programData.id_program,
        title: programData.nama_program,
        semester: parseInt(programData.periode_belajar.split(" ")[1]),
        academic_year: programData.tahun_akademik,
        imageUrl: 'https://via.placeholder.com/300',
      }));

      setPrograms(formattedPrograms);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchKegiatans = async () => {
    try {
      const tanggal = new Date().toISOString().split('T')[0];
      const response = await fetch(`https://backend-sekolah-mu-development.vercel.app/kegiatan/tanggal?tanggal='${tanggal}'`);
      if (!response.ok) {
        throw new Error('Failed to fetch kegiatans');
      }
      const data = await response.json();

      if (!data.data) {
        setKegiatans([]);
        setIsLoading(false);         
        return;
      }

      const formattedKegiatans = data.data.rows.map((kegiatanData: any) => ({
        id: kegiatanData.id_kegiatan,
        title: kegiatanData.nama_kegiatan,
        class: kegiatanData.nama_kelas || '', 
        program: kegiatanData.nama_program || '',
        topic: kegiatanData.nama_topik || '', 
        date: kegiatanData.tanggal || '',
        time: kegiatanData.waktu.slice(0, 5) || '',
        imageUrl: 'https://via.placeholder.com/300',
        taskPercentage: Math.floor(Math.random() * (100 + 1)),
      }));
  
      setKegiatans(formattedKegiatans);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className='bg-neutral8 bg-fixed bg-bottom bg-no-repeat h-svh w-full flex-col justify-center items-center max-[390px]:p-5 p-10 overflow-y-auto' style={{backgroundImage: `url(${homeBackground})`}}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex items-center justify-left space-x-4 mb-5">
            <Link to={'/Profile'}>
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">{profile.name}</h1>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          <div className='flex justify-between items-top w-full mb-4'>
            <div className='flex flex-col'>
              <h1 className='font-bold text-program-title text-text-100'>Kegiatan Hari ini</h1>
              <p className='text-text-100'>{thisDay}</p>
            </div>
            <Link className='flex items-center font-bold text-persian-blue-500 active:text-persian-blue4 text-body-1' to={'/Schedule'}>
              <CalendarTodayIcon sx={{ width: 22 }} />
              <span className="ml-1">Lihat Jadwal</span>
            </Link>
          </div>
          <KegiatanCarousel kegiatans={kegiatans} />
          <div className='flex justify-between items-center w-full my-4'>
            <h1 className='font-bold text-program-title text-text-100'>Tugas Tertunda</h1>
            <Link className='flex items-center font-bold text-persian-blue-500 text-body-1' to={'/pending_task'}>
              Lihat Semua &gt;
            </Link>
          </div>
          <KegiatanPendingTaskCarousel kegiatans={kegiatans} />
          <div className='flex justify-between items-center w-full my-4'>
            <h1 className='font-bold text-program-title text-text-100'>Program</h1>
            <Link className='flex items-center font-bold text-persian-blue-500 text-body-1' to={'/program'}>
              Lihat Semua &gt;
            </Link>
          </div>
          <ProgramCarousel programs={programs} />
          <Link to="/DashboardMuridList" className="w-full max-w-screen-lg rounded-lg shadow-md bg-neutral8 text-white p-4 flex flex-col items-center justify-center space-y-2 mt-8">
            <img src={profIcon} alt="Dashboard Murid" className="w-16 h-16" />
            <span className="text-text-100 font-semibold">Dashboard Murid</span>
          </Link>
        </>
      )}
    </div>
  );
};  

export default HomePage;
