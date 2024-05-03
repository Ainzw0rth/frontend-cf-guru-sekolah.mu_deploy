import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import homeBackground from '../assets/home_background.png';
import { Program } from '../types/Program';
import { Activity } from '../types/Activity';
import { Murid } from '../types/Murid';
import ProgramCarousel from '../components/ProgramCarousel';
import KegiatanCarousel from '../components/KegiatanCarousel';
import KegiatanPendingTaskCarousel from '../components/KegiatanPendingTaskCarousel';
import DashboardCarousel from '../components/DashboardCarousel';

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
  const [kelas, setClasses] = useState(0);
  const [students, setStudents] = useState<Murid[]>([]);

  useEffect(() => {
    Promise.all([fetchPrograms(), fetchKegiatans(), fetchAClass()])
      .catch(error => {
        console.error('Failed to fetch data', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (kelas !== 0) {
      fetchStudents();
    }
  }, [kelas]);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`https://backend-sekolah-mu-development.vercel.app/program/guru/1`);
      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }
      const data = await response.json();

      if (!data.data) {
        setPrograms([]);
        setIsLoading(false);
        return;
      }

      const uniquePrograms: { [key: number]: Program } = {};
      data.data.forEach((programData: any) => {
        const id = programData.id_program;
        if (!uniquePrograms[id]) {
          uniquePrograms[id] = {
            id,
            title: programData.nama_program,
            semester: parseInt(programData.periode_belajar.split(" ")[1]),
            academic_year: programData.tahun_akademik,
            imageUrl: 'https://via.placeholder.com/300',
          };
        }
      });

      const formattedPrograms = Object.values(uniquePrograms);

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

  const fetchAClass = async () => {
    try {
      const response = await fetch(`https://backend-sekolah-mu-development.vercel.app/kelas?guru=1`);
      if (!response.ok) {
        throw new Error('Failed to fetch class');
      }
      const data = await response.json();

      if (!data.data) {
        setIsLoading(false);
        return;
      }

      setClasses(data.data[0].id_kelas);
      console.log("GET A CLASS", data.data[0].id_kelas);

    } catch (error) {
    }
  }

  const fetchStudents = async () => {
    try {
      console.log("MASUK", kelas);
      if (kelas === 0) return;
      const response = await fetch(`https://backend-sekolah-mu-development.vercel.app/murid?kelas=${kelas}`);
      console.log("DONE", response);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();

      if (!data.data) {
        setIsLoading(false);
        return;
      }

      console.log("Data", data.data);
      let students = data.data.map((studentData: any) => ({
        id: studentData.id_murid,
        name: studentData.nama_murid,
        nisn: studentData.nisn,
        path_profile: studentData.path_foto_profil,
      }));

      students = students.slice(0, 5);

      setStudents(students);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

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
          <div className='flex justify-between items-center w-full my-4'>
            <h1 className='font-bold text-program-title text-text-100'>Dashboard Murid</h1>
            <Link className='flex items-center font-bold text-persian-blue-500 text-body-1' to={'/program'}>
              Lihat Semua &gt;
            </Link>
          </div>
          <DashboardCarousel students={students} />
        </>
      )}
    </div>
  );
};  

export default HomePage;
