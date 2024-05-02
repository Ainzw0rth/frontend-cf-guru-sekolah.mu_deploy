import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumb from "../components/Breadcrumb";
import { StudentDashboard } from '../types/Evaluation';
import banner from '../assets/profile_banner.jpg';

import StudentIdentity from '../components/StudentIdentity';
import StudentPresenceChart from '../components/StudentPresenceChart';
import StudentWorkCarousel from '../components/StudentWorkCarousel';
import StudentNote from '../components/StudentNote';

/* TEMPORARY DATA
const DASHBOARD_DATA: StudentDashboard = {
    identity: 
        {
            id: 1,
            name: 'John Doe',
            gender: 'L',
            birth_date: new Date('2000-01-01'),
            nisn: '1234567890',
            path_profile: 'https://i.pinimg.com/736x/c9/33/6f/c9336f3f0a0160c3e2d0e18c7d096b73.jpg',
        },
    presenceSummary: [
        {
            status: 'Hadir',
            total: 10,
        },
        {
            status: 'Sakit',
            total: 2,
        },
        {
            status: 'Izin',
            total: 1,
        },
        {
            status: 'Alpa',
            total: 3,
        },
    ],
    scoreSummary: 80,
    activityCatatan: [
        {
            activity_id: 1,
            activity_name: 'Pengenalan Hewan',
            catatan: 'Lupa membawa buku',
        },
        {
            activity_id: 2,
            activity_name: 'Pengenalan Bentuk',
            catatan: 'Tidak mengerjakan tugas',
        },
        {
            activity_id: 3,
            activity_name: 'Menggambar Pemandangan Desa',
            catatan: 'Mengerjakan tugas dengan baik',
        }
    ],
    activityFeedback: [
        {
            activity_id: 1,
            activity_name: 'Pengenalan Hewan',
            feedback: 'Jangan lupa membawa buku lagi ya',
        },
        {
            activity_id: 2,
            activity_name: 'Pengenalan Bentuk',
            feedback: 'Lain kali lebih fokus mengerjakan tugas ya',
        },
        {
            activity_id: 3,
            activity_name: 'Menggambar Pemandangan Desa',
            feedback: 'Good job! Keep it up!',
        },
        {
            activity_id: 1,
            activity_name: 'Pengenalan Hewan',
            feedback: 'Jangan lupa membawa buku lagi ya',
        },
        {
            activity_id: 2,
            activity_name: 'Pengenalan Bentuk',
            feedback: 'Lain kali lebih fokus mengerjakan tugas ya',
        },
        {
            activity_id: 3,
            activity_name: 'Menggambar Pemandangan Desa',
            feedback: 'Good job! Keep it up!',
        },
        {
            activity_id: 1,
            activity_name: 'Pengenalan Hewan',
            feedback: 'Jangan lupa membawa buku lagi ya',
        },
        {
            activity_id: 2,
            activity_name: 'Pengenalan Bentuk',
            feedback: 'Lain kali lebih fokus mengerjakan tugas ya',
        },
        {
            activity_id: 3,
            activity_name: 'Menggambar Pemandangan Desa',
            feedback: 'Good job! Keep it up!',
        },
        {
            activity_id: 1,
            activity_name: 'Pengenalan Hewan',
            feedback: 'Jangan lupa membawa buku lagi ya',
        },
        {
            activity_id: 2,
            activity_name: 'Pengenalan Bentuk',
            feedback: 'Lain kali lebih fokus mengerjakan tugas ya',
        },
        {
            activity_id: 3,
            activity_name: 'Menggambar Pemandangan Desa',
            feedback: 'Good job! Keep it up!',
        }
    ],
    activityKarya: [
        {
            activity_id: 1,
            activity_name: 'Pengenalan Hewan',
            work_id: 1,
            work_name: 'Gambar Hewan',
            work_type: 'Image',
            work_path: '../src/assets/karya/Gambar Hewan Ani.jpg',
        },
        {
            activity_id: 2,
            activity_name: 'Pengenalan Bentuk',
            work_id: 2,
            work_name: 'Menceritakan Bentuk yang Pernah Dilihat',
            work_type: 'PDF',
            work_path: '../src/assets/karya/Bentuk di Lingkungan Ani.pdf',
        },
        {
            activity_id: 3,
            activity_name: 'Menggambar Pemandangan Desa',
            work_id: 3,
            work_name: 'Menggambar Pemandangan',
            work_type: 'Video',
            work_path: '../src/assets/karya/gambar pemandangan Ani.mp4',
        }
    ],
};
*/

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState<StudentDashboard>();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams<{ id: string }>();    
    
    const idMurid = parseInt(id || '');
    const profileImage = "https://i.pinimg.com/736x/c9/33/6f/c9336f3f0a0160c3e2d0e18c7d096b73.jpg";

    console.log('id:', id);
    console.log('idMurid:', idMurid);

    useEffect(() => {
        fetchStudentSummary();
    }, [id]);

    const fetchStudentSummary = async () => {
        // setDashboardData(DASHBOARD_DATA);
        // setIsLoading(false);
        try {
            const studentResponse = await fetch(`http://localhost:3000/murid/${id}`);
            const presensiResponse = await fetch(`http://localhost:3000/murid/presensi/${id}`);
            const avgNilaiResponse = await fetch(`http://localhost:3000/murid/avg-nilai/${id}`);
            const catatanResponse = await fetch(`http://localhost:3000/murid/catatan/${id}`);
            const feedbackResponse = await fetch(`http://localhost:3000/murid/feedback/${id}`);
            const karyaResponse = await fetch(`http://localhost:3000/murid/karya/${id}`);

            if (!studentResponse.ok || !presensiResponse.ok || !avgNilaiResponse.ok || !catatanResponse.ok || !feedbackResponse.ok || !karyaResponse.ok) {
                throw new Error('Failed to fetch student dashboard data');
            }

            const studentData = await studentResponse.json();
            const presensiData = await presensiResponse.json();
            const avgNilaiData = await avgNilaiResponse.json();
            const catatanData = await catatanResponse.json();
            const feedbackData = await feedbackResponse.json();
            const karyaData = await karyaResponse.json();

            const newDashboardData: StudentDashboard = {
                identity: studentData.data[0] ? {
                    id: studentData.data[0].id_murid,
                    name: studentData.data[0].nama_murid,
                    gender: studentData.data[0].jenis_kelamin,
                    birth_date: new Date(studentData.data[0].tanggal_lahir),
                    nisn: studentData.data[0].nisn,
                    path_profile: studentData.data[0].path_foto_profil
                } : null,
                presenceSummary: presensiData.data.map((presence: any) => ({
                    status: presence.catatan_kehadiran,
                    total: presence.jumlah_kehadiran
                })),
                scoreSummary: avgNilaiData.data[0] ?
                    avgNilaiData.data[0].avg_penilaian : null,
                activityCatatan: catatanData.data.map((catatan: any) => ({
                    activity_id: catatan.id_kegiatan,
                    activity_name: catatan.nama_kegiatan,
                    catatan: catatan.catatan
                })),
                activityFeedback: feedbackData.data.map((feedback: any) => ({
                    activity_id: feedback.id_kegiatan,
                    activity_name: feedback.nama_kegiatan,
                    feedback: feedback.feedback
                })),
                activityKarya: karyaData.data.map((karya: any) => ({
                    activity_id: karya.id_kegiatan,
                    activity_name: karya.nama_kegiatan,
                    work_id: karya.id_karya,
                    work_name: karya.nama_karya,
                    work_type: karya.jenis_karya,
                    work_path: karya.path_karya
                }))
            };
            
            setIsLoading(false);
            setDashboardData(newDashboardData);
        } catch (error) {
            console.error('Error fetching student summary:', error);
        }
    };

    const breadcrumb = [
        { label: 'Home', link: '/' },
        { label: 'Dashboard', link: '/dashboard' },
        { label: dashboardData?.identity?.name || 'Student', link: `/dashboard/${dashboardData?.identity?.id || ''}` }
    ];
    

    console.log('dashboardData:', dashboardData);

    return (
        <div className='flex flex-col'>
            <Breadcrumb items={breadcrumb}/>

            {/* Banner */}
            <div 
                className='h-64 w-full flex justify-center items-center bg-cover bg-center' 
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className='flex flex-col items-center'>
                    <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full mb-3" />
                    <p className="text-2xl font-semibold">{dashboardData?.identity?.name ?? 'No Name'}</p>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                {isLoading ? (
                    <p className="text-neutral9 italic">Loading...</p>
                ) : (
                    <div className='items-center' style={{ width: '95%'}}>
                        {/* Identitas Murid */}
                        <div style={{marginTop: '20px'}}>
                            <StudentIdentity student={dashboardData?.identity || null} averageScore={dashboardData?.scoreSummary || 0} />
                        </div>

                        {/* Statistik Presensi */}
                        <div style={{marginTop: '20px'}}>
                            <StudentPresenceChart presence={dashboardData?.presenceSummary || []} />
                        </div>

                        {/* Hasil Karya */}
                        <div style={{marginTop: '20px'}}>
                            <StudentWorkCarousel student={dashboardData?.activityKarya || []} />
                        </div>

                        {/* Catatan Internal */}
                        <div style={{marginTop: '20px'}}>
                            <StudentNote student={dashboardData?.activityCatatan || []} type='catatan' />
                        </div>

                        {/* Feedback Murid */}
                        <div style={{marginTop: '20px'}}>
                            <StudentNote student={dashboardData?.activityFeedback || []} type='feedback' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );      
}

export default DashboardPage;
