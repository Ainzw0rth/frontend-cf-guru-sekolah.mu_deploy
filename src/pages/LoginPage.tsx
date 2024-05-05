import { useRef, useState } from 'react';
import homeBackground from '../assets/home_background.png';
import TextField from '../components/TextField';
import { login } from '../utils/authUtils';

const LoginPage = () => {
    const [email, setEmail] = useState('tony@sekolahmu.com');
    const [password, setPassword] = useState('sekolahmu');

    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitBtnRef.current) {
            submitBtnRef.current.disabled = true;
        }

        const teacherId = await login(email, password);
        if (teacherId !== -1 && teacherId !== undefined) {
            window.location.href = '/';
        } else {
            alert('Login gagal, silahkan coba lagi');
        }

        if (submitBtnRef.current) {
            submitBtnRef.current.disabled = false;
        }
    }

    return (
        <main className="px-7 bg-fixed bg-no-repeat bg-bottom py-32 h-screen" style={{backgroundImage: `url(${homeBackground})`}}>
            <div className="flex flex-col gap-4">
                <h1 className="text-text-100 text-heading-2 font-semibold">Log In</h1>
                <p className="text-neutral-900 text-paragraph-3">
                        Masuk terlebih dahulu untuk mengakses dashboard guru Sekolah.mu <br/><br/>
                </p>
            </div>
            <form className='flex flex-col gap-8 my-8' onSubmit={handleSubmit}>
                <TextField 
                    label="Email" value={email} onChange={handleEmailChange} type='text'
                    active={email !== ''}
                />

                <TextField 
                    label="Password" value={password} onChange={handlePasswordChange} type='password'
                    active={password !== ''}
                />
                <button className=
                    "bg-persian-blue-500 text-white py-3 rounded-full w-full text-heading-3 font-semibold \
                    shadow-hard transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    type='submit' ref={submitBtnRef}
                >
                    Masuk
                </button>
            </form>
        </main>
    );
}

export default LoginPage;