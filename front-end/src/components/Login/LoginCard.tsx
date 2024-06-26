"use client";
import Image from "next/image";
import student from "../../../public/StudentBanner.png";
import logo from "../../../public/Logo.svg";
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { axioslib } from "@/lib/axioslib";
import { useRouter } from "next/navigation";

const LoginCard: React.FC = () => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [user, setUser] = useState({
        user_id: '',
        password: '',
    });

    const validatePassword = (password: string) => {
        const minLength = 5;
        if (password.length < minLength) {
            return 'Password must be at least 5 characters long';
        }

        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });

        if (name === 'password') {
            const validationError = validatePassword(value);
            setPasswordError(validationError);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginError('');
        if (passwordError) return;

        try {
            const response = await axioslib.post('/api/user/login', user);
            if (response.status === 200) {
                window.location.href = "/";
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setLoginError('Invalid username or password');
            } else {
                setLoginError('Invalid username or password.');
            }
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 mx-4 sm:mx-8 md:mx-12 md:rounded-bl-10xl lg:mx-20 xl:mx-52 mb-4 mt-12 border-0 border-primary-light md:border-2 rounded-5xl md:rounded-tr-10xl md:rounded-9xl">
                {/* Left Side */}
                <div className="bg-gradient-to-r from-primary to-primary-light rounded-9xl rounded-bl-10xl rounded-r-none md:block hidden">
                    <div className="mx-4 sm:mx-8 mt-5 mb-4 sm:mb-24 md:flex flex-col items-center">
                        <Image
                            className="mb-12 select-none pointer-events-none"
                            src={student}
                            alt="student"
                            width={400}
                            height={400}
                        />
                        <h1 className="text-center font-bold text-white text-3xl mb-2 mt-12 select-none">
                            Welcome to Our Website!
                        </h1>
                    </div>
                </div>

                {/* Right Side */}
                <div className="mx-4 sm:mx-8 mt-20 md:mt-28 flex flex-col items-center">
                    <div className="mb-12 flex flex-row items-center sm:mr-0">
                        <Image className="pointer-events-none select-none" src={logo} alt="logo" width={120} height={60} />
                        <div className="ml-4">
                            <h1 className="mt-2 font-bold text-3xl">Log in</h1>
                            <p className="text-sm text-gray-600">And Enjoy in Learno !</p>
                        </div>
                    </div>
                    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                        {/* Input Username */}
                        <div className="relative mb-6">
                            <div className="w-full relative group">
                                <input
                                    type="text"
                                    id="username"
                                    name="user_id"
                                    required
                                    className="h-10 w-full px-4 py-2 text-md peer bg-white outline-none border-b-2 border-salate-500 focus:border-primary"
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="username"
                                    className="absolute top-0 left-0 h-full flex items-center pl-2 text-sm text-gray-400 transform origin-top transition-all pointer-events-none peer-focus:-translate-y-full peer-valid:-translate-y-full peer-valid:pl-0 group-focus-within:text-xs group-focus-within:-translate-y-full peer-valid:text-primary peer-valid:h-1/2 group-focus-within:h-1/2 group-focus-within:pl-0 peer-focus:text-primary"
                                >
                                    Username
                                </label>
                            </div>
                        </div>
                        {/* Input Password */}
                        <div className="relative mb-6">
                            <div className="w-full relative group">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    required
                                    className="h-10 w-full px-4 py-2 text-md peer bg-white outline-none border-b-2 border-salate-500 focus:border-primary "
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute top-0 left-0 h-full flex items-center pl-2 text-sm text-gray-400 transform origin-top transition-all pointer-events-none peer-focus:-translate-y-full peer-valid:-translate-y-full peer-valid:pl-0 group-focus-within:text-xs group-focus-within:-translate-y-full peer-valid:text-primary peer-valid:h-1/2 group-focus-within:h-1/2 group-focus-within:pl-0 peer-focus:text-primary"
                                >
                                    Password
                                </label>
                                {/* Icon Eye */}
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-0 right-0 h-full flex items-center px-3"
                                >
                                    {passwordVisible ? (
                                        <FaEye className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="ml-2 text-sm text-bookmark1 mt-2">{passwordError}</p>
                            )}
                            <p className="ml-2 text-sm text-salate-500 mt-2 text-right">Forgot password?</p>
                        </div>
                        {loginError && (
                            <p className="text-sm text-bookmark1 mb-4">{loginError}</p>
                        )}
                        <center>
                            <button
                                type="submit"
                                className="bg-primary-light text-white rounded-3xl py-4 w-56 font-bold mb-12"
                                disabled={Boolean(passwordError)}
                            >
                                Login
                            </button>
                        </center>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginCard;
