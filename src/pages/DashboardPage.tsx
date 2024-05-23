/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumb from "../components/Breadcrumb";
import { StudentDashboard } from '../types/Evaluation';
import banner from '../assets/profile_banner.jpg';

import StudentIdentity from '../components/StudentIdentity';
import StudentPresenceChart from '../components/StudentPresenceChart';
import StudentWorkCarousel from '../components/StudentWorkCarousel';
import StudentNote from '../components/StudentNote';
import { BASE_URL } from '../const';
import { Skeleton } from '@mui/material';

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState<StudentDashboard>();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams<{ id: string }>();    

    useEffect(() => {
        fetchStudentSummary();
    }, [id]);

    const fetchStudentSummary = async () => {
        // setDashboardData(DASHBOARD_DATA);
        // setIsLoading(false);
        try {
            const studentResponse = await fetch(`${BASE_URL}/murid/${id}`);
            const presensiResponse = await fetch(`${BASE_URL}/murid/presensi/${id}`);
            const avgNilaiResponse = await fetch(`${BASE_URL}/murid/avg-nilai/${id}`);
            const catatanResponse = await fetch(`${BASE_URL}/murid/catatan/${id}`);
            const feedbackResponse = await fetch(`${BASE_URL}/murid/feedback/${id}`);
            const karyaResponse = await fetch(`${BASE_URL}/murid/karya/${id}`);

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
                    work_type: karya.tipe_file,
                    work_path: karya.file_path
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
    
    return (
        <div className='flex flex-col'>
            <Breadcrumb items={breadcrumb}/>

            {/* Banner */}
            <div 
                className='h-64 w-full flex justify-center items-center bg-cover bg-center' 
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className='flex flex-col items-center'>
                    {
                        !dashboardData?.identity?.path_profile ? (
                            <div>
                                <Skeleton variant="circular" width={100} height={100} />
                            </div>
                        ) : (
                            <img src={dashboardData?.identity?.path_profile} alt="Profile" className="w-32 h-32 rounded-full mb-3" />
                        )
                    }
                    <p className="text-2xl font-semibold">{dashboardData?.identity?.name ?? <Skeleton variant="text" width={200} height={70}/>}</p>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                {isLoading ? (
                    <div>
                        <Skeleton variant="rounded" width={600} height={250} sx={{ marginTop: 2}}/>
                        <Skeleton variant="rounded" width={600} height={250} sx={{ marginTop: 2}}/>
                        <Skeleton variant="rounded" width={600} height={250} sx={{ marginTop: 2}}/>
                    </div>
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
