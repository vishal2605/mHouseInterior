import React from 'react';
import DashboardImg from '../assets/dashboard_img.jpg';
import ConfigData from '../config.json';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const { info } = ConfigData;
    const goToContact = () => {
        navigate('/contact'); 
    }
    return (
        <>
            <section>
                <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 2xl:hscreen lg:grid-cols-2">
                        <Slide left>
                            <div className="relative z-10 lg:py-16">
                                <div className="relative h-64 sm:h-80 lg:h-full">
                                    <img 
                                        src={DashboardImg}
                                        className='absolute inset-0 h-full w-full object-cover'
                                        alt="Dashboard"
                                    />
                                </div>
                            </div>
                        </Slide>

                        <Fade right>
                            <div className='relative flex items-center bg-gray-100'>
                                <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>
                                <div className='p-8 sm:p-16 lg:p-24'>
                                    <div className='p-8 sm:p-16 lg:p-0 place-items-center'>
                                        <Zoom>
                                            <h1 className="font-coolvetica text-3xl text-gray-700 font-bold sm:text-5xl">
                                                Welcome To,
                                            </h1>
                                            <h1 className="font-coolvetica text-3xl font-bold sm:text-5xl tracking-wide text-amber-600">
                                                {info.name}
                                            </h1>
                                        </Zoom>
                                        <div className='mt-7 font-normal text-gray-700'>
                                            {info.welcomeMessage1}
                                        </div>
                                        <h2 className='mt-3 text-gray-700'>
                                            {info.welcomeMessage2}
                                        </h2>
                                        <Fade bottom>
                                            <button className='mt-7 px-4 py-2 border-2 border-amber-600 bg-amber-600 text-white rounded hover:bg-white hover:text-amber-600' onClick={goToContact}>
                                                Get in Touch
                                            </button>
                                        </Fade>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Dashboard;
