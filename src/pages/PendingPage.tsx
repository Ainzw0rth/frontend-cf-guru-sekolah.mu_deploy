import cloudland from '../assets/cloud_land.svg';
import Breadcrumb from "../components/Breadcrumb";
import banner from '../assets/profile_banner.jpg';
import { useEffect, useState } from 'react';
import { Activity } from '../types/Activity';
import { getTeacherId } from '../utils/authUtils';
import { get } from 'http';


const breadcrumb = [
    {label: 'Home', link: '/'},
    {label: 'Pending', link: `/Pending`}
];

const PendingPage = () => {
    const [pending, setPending] = useState<Activity[]>([]);

    useEffect(() => {
        const fetchPending = async () => {
            try{
                const response = await fetch('https://backend-sekolah-mu-development.vercel.app/tugastertunda/all',
                    {
                        method: 'GET',
                        body: JSON.stringify({
                            id_guru: getTeacherId()
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch pending tasks');
                }

                const resJson = await response.json();

                console.log(resJson);


            } catch (error) {

            }
        };
    }, []);

    return (
    <div className='flex flex-col'>
        <Breadcrumb items={breadcrumb}/>

        <div className='flex flex-col justify-center items-center' style={{
        backgroundImage: `url(${cloudland})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0% 90%',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        height: '100vh'
        }}>

        {pending.length === 0 ? (
            <div className='flex justify-center items-center my-4'>
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