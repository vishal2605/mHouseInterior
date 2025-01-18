import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { ChangePasswordDialogAtom, UsernameAtom } from '../../store/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { changePassword } from '../api\'s/Services';
import {  toast } from 'react-hot-toast';

export function ChangePasswordDialog() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const open = useRecoilValue(ChangePasswordDialogAtom);
    const setOpen = useSetRecoilState(ChangePasswordDialogAtom);
    const username = useRecoilValue(UsernameAtom);
    const onClose = () => {
        setOpen(false);
    };

    const closeDialog = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setSuccess('');
        onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
    
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password did not match.');
            return;
        }
    
        try {
            const { response, error } = await changePassword({
                username,
                oldPassword,
                newPassword
            });
    
            if (response) {
                toast.success(response.message || 'Password changed successfully.');
                closeDialog();
            } else {
                setError(error || 'Error changing password.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An unexpected error occurred.');
        }
    };
    return (
        <Dialog  open={open} onClose={onClose} sx={{
            '& .MuiDialog-paper': {
                width: ['80%', '50%'], // 80% width for mobile, 50% for larger screens
                maxWidth: 'none',
            },
        }}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                {error && <div className="text-sm font-medium text-red-500">{error}</div>}
                {success && <div className="text-sm font-medium text-green-500">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-700">
                        Old Password
                        </label>
                        <div className="mt-2">
                        <input
                            id="old-password"
                            name="OldPassword"
                            type="password"
                            value={oldPassword}
                            autoComplete="current-password"
                            onChange={(e) => setOldPassword(e.target.value)}
                            aria-describedby="first-name-error"
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-700">
                        New Password
                        </label>
                        <div className="mt-2">
                        <input
                            id="new-password"
                            name="NewPassword"
                            type="password"
                            value={newPassword}
                            autoComplete="current-password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            aria-describedby="first-name-error"
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-700">
                        Confirm New Password
                        </label>
                        <div className="mt-2">
                        <input
                            id="confirm-password"
                            name="ConfirmPassword"
                            type="password"
                            value={confirmPassword}
                            autoComplete="current-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            aria-describedby="first-name-error"
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <button
                      onClick={closeDialog}
                      className=" rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
                    >
                      Cancel
                    </button>
                <button
                onClick={handleSubmit}
                className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </DialogActions>
        </Dialog>
    );
}
