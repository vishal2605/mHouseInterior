import React from 'react';
import { motion } from 'framer-motion';
import DashboardImg from '../assets/dashboard_img.jpg';
import ConfigData from '../config.json';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const { info } = ConfigData;

    const goToContact = () => {
        navigate('/contact');
    };

    return (
        <>
            <section>
                <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 2xl:h-screen lg:grid-cols-2">
                        {/* Slide-in effect for the image */}
                        <motion.div
                            className="relative z-10 lg:py-16"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="relative h-64 sm:h-80 lg:h-full">
                                <img
                                    src={DashboardImg}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    alt="Dashboard"
                                />
                            </div>
                        </motion.div>

                        {/* Fade-in effect for the text content */}
                        <motion.div
                            className="relative flex items-center bg-gray-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2 }}
                        >
                            <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>
                            <div className="p-8 sm:p-16 lg:p-24">
                                <div className="p-8 sm:p-16 lg:p-0 place-items-center">
                                    {/* Zoom-in effect for the heading */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <h1 className="font-coolvetica text-3xl text-gray-700 font-bold sm:text-5xl">
                                            Welcome To,
                                        </h1>
                                        <h1 className="font-coolvetica text-3xl font-bold sm:text-5xl tracking-wide text-amber-600">
                                            {info.name}
                                        </h1>
                                    </motion.div>

                                    <div className="mt-7 font-normal text-gray-700">
                                        {info.welcomeMessage1}
                                    </div>
                                    <h2 className="mt-3 text-gray-700">
                                        {info.welcomeMessage2}
                                    </h2>

                                    {/* Button fade-in effect */}
                                    <motion.button
                                        className="mt-7 px-4 py-2 border-2 border-amber-600 bg-amber-600 text-white rounded hover:bg-white hover:text-amber-600"
                                        onClick={goToContact}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1.5 }}
                                    >
                                        Get in Touch
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
