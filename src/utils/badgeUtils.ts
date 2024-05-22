import { getTeacherId } from "./authUtils";
import { BASE_URL } from "../const";

export const updateBadges = async () => {
    const idGuru = getTeacherId();

    if (!idGuru) {
        return;
    }
    try {
        const badgeTypes = {
            'streak': 1,
            'streakmaster': 2,
            'streakking': 3,
            'gocap': 4,
            'cepek': 5,
            'konsisten': 6,
            'ambis': 7,
        };
        
        for (const [badgeType, badgeValue] of Object.entries(badgeTypes)) {
            const response = await fetch(`${BASE_URL}/profil/badges/${badgeType}/${idGuru}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            if (!response.ok) {
                throw new Error('Failed to update badges');
            }
        
            const isQualifiedforBadge = await response.json();

            if (isQualifiedforBadge.data == true) {
                const responseUpdate = await fetch(`${BASE_URL}/badge/${badgeType}/${idGuru}`, { 
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