/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import banner from '../assets/profile_banner.jpg';
import { getTeacherId } from '../utils/authUtils';
import { BASE_URL } from '../const';
import { logout } from '../utils/authUtils';

const TeacherProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`${BASE_URL}/profil/${getTeacherId()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            
            const profileData = await response.json();
            setProfile(profileData);
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col items-center'>
            <img src={(profile as any).data[0].path_foto_profil} alt="Profile" className="w-32 h-32 rounded-full" />
            <p className="text-2xl font-semibold">{(profile as any).data[0].nama_guru} </p>
        </div>
    );
};

const BadgesList = () => {
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        const fetchBadges = async () => {
            const response = await fetch(`${BASE_URL}/profil/badges/${getTeacherId()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch badges');
            }
            
            const badgesData = await response.json();
            setBadges(badgesData);
        };

        fetchBadges();
    }, []);

    if (!badges) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col gap-5 my-7 mx-4'>
            {(badges as any).data && (badges as any).data.map((badge: any) => (
                <>
                <div key={badge.id_badge} className='w-full flex justify-center items-center gap-5 shadow-hard rounded-lg p-3 border-2'>
                    <img src={badge.path_badge} alt="Badge" className="w-24 h-24 ml-2 object-contain"/>
                    <div className='flex flex-col gap-3'>
                        <p className="text-left text-2xl font-semibold">{badge.nama_badge}</p>
                        <p className="text-left text-body-3 text-neutral1 max-w-80">{badge.deskripsi}</p>
                    </div>
                </div>
                </>
            ))}
            <button 
                onClick={() => {
                    logout();
                    window.location.href = '/';
                }} 
                className="bg-presence-red text-white font-semibold rounded-lg px-5 py-2 m-5 mb-10"
            >
                Logout
            </button>
        </div>
    );
};

const ProfilePage = () => {
    const [numberOfRows, setNumberOfRows] = useState(0);
   
    useEffect(() => {
        const fetchBadgeCount = async () => {
            // Replace with your actual fetch logic
            const response = await fetch(`${BASE_URL}/profil/badges/` + getTeacherId());
            const badgeCount = await response.json();
            setNumberOfRows(badgeCount.data.length);
        };

        fetchBadgeCount();
    }, []);

    return (
        <div className='flex flex-col items-center'>
            <div 
                className='h-64 w-full flex justify-center items-center bg-cover bg-center' 
                style={{ backgroundImage: `url(${banner})` }}
            >

                <TeacherProfile />

            </div>

            {/* // badge counter */}
            <div className='flex items-center justify-center shadow-hard border-2 h-14 mt-5 rounded-lg max-w-96 min-w-56'>
                <p className="text-center text-2xl font-semibold mr-3">Badges:</p>
                <p className="text-center text-2xl font-semibold text-persian-blue-500">{numberOfRows}</p>
            </div>

            {/* // badges list */}
            <BadgesList/>
        </div>
    );
}

export default ProfilePage;