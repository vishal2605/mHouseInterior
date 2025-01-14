import React from 'react';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { ChangePasswordDialogAtom, LogoutDialogAtom } from '../../store/atom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLogout,setIsLogout] = useRecoilState(LogoutDialogAtom);
    const [isChangePassword,setIsChangePassword] = useRecoilState(ChangePasswordDialogAtom);

    const goToHome = () => {
        navigate('/adminDashboard');
    };
    const openDialog = () => {
        setIsLogout(true);
    }
    const openChangePasswordDialog = ()=>{
        setIsChangePassword(true);
        console.log('isChangePassword ',isChangePassword);
    }
    return (
        <div className='flex justify-between items-center px-5 bg-white shadow-md'>
            <div className='cursor-pointer flex items-center' onClick={goToHome}>
                <img src={Logo} className='w-28 h-20' alt="Logo" />
            </div>
            <Menu as="div" className="relative">
                <div>
                    <MenuButton className="relative flex items-center rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                            alt="User avatar"
                            src="https://ui-avatars.com/api/?name=Mukesh+Lohar"
                            className="h-10 w-10 rounded-full"
                        />
                    </MenuButton>
                </div>
                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <MenuItem>
                        {({ active }) => (
                            <a
                                href="#"
                                className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
                                onClick={openChangePasswordDialog}
                            >
                                Change Password
                            </a>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ active }) => (
                            <a
                                href="#"
                                className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
                                onClick={openDialog}
                            >
                                Logout
                            </a>
                        )}
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
};

export default Navbar;
