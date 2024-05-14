import cloudland from '../assets/cloud_land.svg';
import Breadcrumb from "../components/Breadcrumb";
// import banner from '../assets/profile_banner.jpg';
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

                setPending(resJson.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPending();
    }, []);

    return (
    <div className='flex flex-col'>
        <Breadcrumb items={breadcrumb}/>

        <div className='flex flex-col justify-center items-center relative' style={{
        backgroundImage: `url(${cloudland})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0% 90%',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        height: '100vh'
        }}>

        {pending.length === 0 ? (
            <div className='absolute top-0 flex justify-center items-center'>
                <p className='my-24'>Tidak ada tugas yang tertunda! Selamat!</p>
            </div>
        ) : (
            <div/>
        )}
        
        </div>
    </div>
    );
};

export default PendingPage;