import axiosApiInstance from 'axios';
import { useSelector } from 'react-redux';

export const signIn = async (playload: any) => {
    const res = await axiosApiInstance.post('https://2c45-2a01-e0a-1d1-8260-f87c-698-fcb1-ea97.eu.ngrok.io/users/login', playload);
    return res
}

export const register = async (playload: any) => {
    console.log("register")
    const res = await axiosApiInstance.post('https://2c45-2a01-e0a-1d1-8260-f87c-698-fcb1-ea97.eu.ngrok.io/signup', playload);
    return res
}

