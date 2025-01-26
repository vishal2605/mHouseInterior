import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const goToHome = () => {
        navigate('/');
    };
    const goToProjects = () => {
        navigate('/projects');
    };
    const goToServices = () => {
        navigate('/services');
    };
    const goToAbout = () => {
        navigate('/about');
    };
    const goToContact = () => {
        navigate('/contact');
    }

    return (
        <div>
            <div className="flex justify-between p-2 items-center">
                <div className='cursor-pointer' onClick={goToHome}>
                    <img src={Logo} className='w-28 h-24 pl-3' alt="Logo"/>
                </div>
                <div className='hidden md:flex p-2 font-semibold place-items-center'>
                    <div className='p-3 hover:text-amber-600 text-gray-700 cursor-pointer' onClick={goToProjects}>
                        PROJECT
                    </div>
                    <div className='p-3 hover:text-amber-600 text-gray-700 cursor-pointer' onClick={goToServices}>
                        SERVICES
                    </div>
                    <div className='p-3 hover:text-amber-600 text-gray-700 cursor-pointer' onClick={goToAbout}>
                        ABOUT
                    </div>
                    <div className='p-3 hover:text-amber-600 text-gray-700 cursor-pointer' onClick={goToContact}>
                        CONTACT
                    </div>
                </div>
                <div className="md:hidden pr-3">
                    <button onClick={toggleMobileMenu} className="focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}></div>
            )}

            {/* Mobile Menu */}
            <div className={`fixed inset-y-0 right-0 bg-slate-200 z-50 w-3/4 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <div className="flex justify-between p-4">
                    <div className='text-xl font-bold'>
                        MENU
                    </div>
                    <button onClick={toggleMobileMenu} className="focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col space-y-6 mt-4">
                    <div className='flex p-2 pl-10 hover:text-amber-600 cursor-pointer font-semibold' onClick={() => { goToProjects(); toggleMobileMenu(); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-folder mt-1 mr-2" viewBox="0 0 16 16">
                            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
                        </svg>
                        PROJECTS
                    </div>
                    <div className='flex p-2 pl-10 hover:text-amber-600 cursor-pointer font-semibold' onClick={() => { goToServices(); toggleMobileMenu(); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-briefcase mt-1 mr-2" viewBox="0 0 16 16">
                            <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                        SERVICES
                    </div>
                    <div className='flex p-2 pl-10 hover:text-amber-600 cursor-pointer font-semibold' onClick={() => { goToAbout(); toggleMobileMenu(); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-info-circle mt-1 mr-2" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                        </svg>
                        ABOUT
                    </div>
                    <div className='flex p-2 pl-10 hover:text-amber-600 cursor-pointer font-semibold' onClick={() => {goToContact(); toggleMobileMenu();}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-envelope mt-1 mr-2" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                        </svg>
                        CONTACT
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
