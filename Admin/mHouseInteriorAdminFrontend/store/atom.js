import {atom} from 'recoil';

export const LogoutDialogAtom = atom({
    key: 'LogoutDialogAtom',
    default: false
})
export const ChangePasswordDialogAtom = atom({
    key:'ChangePasswordDialogAtom',
    default:false
})

export const UsernameAtom = atom({
    key : 'UsernameAtom',
    default : ""
})