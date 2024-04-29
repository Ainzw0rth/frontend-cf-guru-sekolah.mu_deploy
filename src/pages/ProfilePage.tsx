import banner from '../assets/profile_banner.jpg';

const ProfilePage = () => {
    const profileImage = "data:image/jpeg;base64,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";
    const tempBadgeImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGd9d6rztU9VfgNJdmGpMUOJ2sqDdSdF844nDchUIPFio1qucdnJPJy2CKqtpPvhaGVto&usqp=CAU"
    
    return (
        <div className='flex flex-col items-center'>
            <div 
                className='h-64 w-full flex justify-center items-center bg-cover bg-center' 
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className='flex flex-col items-center'>
                    <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full" />
                    <p className="text-2xl font-semibold">Javier S.pd</p>
                </div>
            </div>

            {/* // badge counter */}
            <div className='flex items-center justify-center shadow-hard border-2 h-14 mt-5 rounded-lg max-w-96 min-w-56'>
                <p className="text-center text-2xl font-semibold mr-3">Badges:</p>
                <p className="text-center text-2xl font-semibold text-persian-blue-500">0</p>
            </div>

            {/* // badges list */}
            <div className='flex flex-col gap-8 mt-20'>
                <div className='flex justify-center items-center gap-10 shadow-hard rounded-lg p-3 border-2'>
                    <img src={tempBadgeImage} alt="Profile" className="w-32 h-32 rounded-full ml-2" />
                    <div className='flex flex-col gap-5 mr-2'>
                        <p className="text-left text-2xl font-semibold">Si Paling Rajin</p>
                        <p className="text-left text-body-3 text-neutral1 max-w-80">Memiliki streak 30 hari tanpa pengumpulan telat</p>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-10 shadow-hard rounded-lg p-3 border-2'>
                    <img src={tempBadgeImage} alt="Profile" className="w-32 h-32 rounded-full ml-2" />
                    <div className='flex flex-col gap-5 mr-2'>
                        <p className="text-left text-2xl font-semibold">Si Paling Rajin</p>
                        <p className="text-left text-body-3 text-neutral1 max-w-80">Memiliki streak 30 hari tanpa pengumpulan telat</p>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-10 shadow-hard rounded-lg p-3 border-2'>
                    <img src={tempBadgeImage} alt="Profile" className="w-32 h-32 rounded-full ml-2" />
                    <div className='flex flex-col gap-5 mr-2'>
                        <p className="text-left text-2xl font-semibold">Si Paling Rajin</p>
                        <p className="text-left text-body-3 text-neutral1 max-w-80">Memiliki streak 30 hari tanpa pengumpulan telat</p>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-10 shadow-hard rounded-lg p-3 border-2'>
                    <img src={tempBadgeImage} alt="Profile" className="w-32 h-32 rounded-full ml-2" />
                    <div className='flex flex-col gap-5 mr-2'>
                        <p className="text-left text-2xl font-semibold">Si Paling Rajin</p>
                        <p className="text-left text-body-3 text-neutral1 max-w-80">Memiliki streak 30 hari tanpa pengumpulan telat</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;