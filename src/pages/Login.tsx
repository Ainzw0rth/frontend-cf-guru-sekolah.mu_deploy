import { useState } from 'react';
import homeBackground from '../assets/home_background.png';
import TextField from '../components/TextField';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Mock login
    }

    return (
        <main className="px-7 bg-fixed bg-no-repeat bg-bottom py-32" style={{backgroundImage: `url(${homeBackground})`}}>
            <div className="flex flex-col gap-4">
                <h1 className="text-text-100 text-heading-2 font-semibold">Log In</h1>
                <p className="text-neutral-900 text-paragraph-3">
                        Masuk terlebih dahulu untuk mengakses dashboard guru Sekolah.mu
                </p>
            </div>
            <form className='flex flex-col gap-8 my-8' onSubmit={handleSubmit}>
                <TextField label="Email" value={email} onChange={handleEmailChange} type='text'/>
                <TextField label="Password" value={password} onChange={handlePasswordChange} type='password'/>
                <button className=
                    "bg-persian-blue-500 text-white py-3 rounded-full w-full text-heading-3 font-semibold" 
                type='submit'>
                    Masuk
                </button>
            </form>
        </main>
    );
}

export default Login;