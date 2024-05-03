// For the login, we'll just use a simple logic, with stored teacher_id in localStorage
// If the account_id is not stored, then the user is not logged in

// We are aware this is not the safe approach, but the purpose of this auth is just for demonstration
// to show how different data will be shown to the teacher's id
export const isLoggedIn = () => {
    return localStorage.getItem('teacher_id') !== null
}

export const logout = () => {
    localStorage.removeItem('teacher_id')
}

export const login = async (email: string, password: string) : Promise<number> => {
    // Returns
    // 1. teacher_id if success
    // 2. -1 if failed

    let teacher_id = -1;
    await fetch('https://backend-sekolah-mu-development.vercel.app/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(res => {
        localStorage.setItem('teacher_id', res.data)
        teacher_id = res.data
    }).catch(err => {
        console.error(err)
    });

    return teacher_id;
}

export const getTeacherId = () => {
    // Get the teacher_id from localStorage
    return localStorage.getItem('teacher_id')
}