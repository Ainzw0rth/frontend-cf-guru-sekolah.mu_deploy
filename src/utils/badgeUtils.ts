export const updateBadges = async (idGuru: any) => {
    console.log('Updating badges for teacher with id', idGuru);
    try {
        const badgeTypes = {
            'streak': 1,
            'streakmaster': 2,
            'streakking': 3,
            'gocap': 4,
            'cepek': 5
        };
        
        for (const [badgeType, badgeValue] of Object.entries(badgeTypes)) {
            const response = await fetch(`https://backend-sekolah-mu-development.vercel.app/badge/${badgeType}/${idGuru}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            if (!response.ok) {
                throw new Error('Failed to update badges');
            }
        
            const jsonData = await response.json();
        
            if (jsonData.data == true) {
                const responseUpdate = await fetch(`https://backend-sekolah-mu-development.vercel.app/badge/${badgeType}/${idGuru}`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_badge: badgeValue,
                        id_guru: idGuru
                    })
                });

                if (!responseUpdate.ok) {
                    throw new Error('Failed to update badges');
                }
            }
        }
        
        console.log('Badges updated');
    } catch (error) {
        console.log('Failed to update badges');
    }
}