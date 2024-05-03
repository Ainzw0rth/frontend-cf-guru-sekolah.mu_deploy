export const isLoggedIn = () => {
    // For the login, we'll just use a simple logic, with stored teacher_id in localStorage
    // If the account_id is not stored, then the user is not logged in

    // We are aware this is not the safe approach, but the purpose of this auth is just for demonstration
    // to show how different data will be shown to the teacher's id
    return localStorage.getItem('teacher_id') !== null
}

export const logout = () => {
    // Redirect to login page
    localStorage.removeItem('teacher_id')
}

export const login = (teacher_id: string) => {
    // Set the teacher_id in localStorage
    // Redirect to home page
    localStorage.setItem('teacher_id', teacher_id)
}

export const getTeacherId = () => {
    // Get the teacher_id from localStorage
    return localStorage.getItem('teacher_id')
}