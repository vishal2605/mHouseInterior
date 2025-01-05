import { useEffect, useState } from 'react';
import LoginImg from '../assets/LoginImg.jpg';
import { login } from '../api\'s/Services';
import { useNavigate } from 'react-router-dom';
import zod from 'zod';
const Login = () => {

    const userSchema = zod.object({
        username: zod.string().min(1),
        password: zod.string().min(8)
    })

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    navigate('/adminDashboard');
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkAuth();
    }, [navigate]);

    async function handleLogin() {
        userSchema.parse({username: username,password: password});
        try {
            const response = await login({ username, password });
            if (response.token) {
                localStorage.setItem('token', response.token);
                navigate('/adminDashboard');
            } else {
                setErrorMessage('Error while logging in');
            }
        } catch (error) {
            console.error('Error while login:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <img src={LoginImg} className="w-full md:w-3/5 h-1/3 md:h-full" alt="Login" />
            <div className="w-full md:w-2/5 py-2.5 mt-10 md:mt-20 px-4">
                <div className="text-center font-bold text-3xl text-gray-700">Login</div>
                <div className="text-center font-medium text-lg mt-6 text-amber-600">
                    Welcome to mHouseInterior admin dashboard
                </div>
                <div className="px-8 mt-10">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-700"
                    >
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="px-8 mt-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-700"
                    >
                        Password
                    </label>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                {errorMessage && (
                    <div className="px-8 mt-4 text-red-600 text-sm">{errorMessage}</div>
                )}
                <div className="px-8 mt-6">
                    <button
                        className="bg-amber-600 text-white rounded-md py-1.5 text-center w-full"
                        onClick={handleLogin} // Pass reference, not invocation
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
