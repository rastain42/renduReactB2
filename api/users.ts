import axiosApiInstance from 'axios';
import { useSelector } from 'react-redux';

export const signIn = async (playload: any) => {
    const res = await axiosApiInstance.post('https://1793-2a01-cb19-121-7900-a1bf-5161-4b0c-75f6.ngrok.io/users/login', playload);
    return res
}

export const register = async (playload: any) => {
    console.log("register")
    const res = await axiosApiInstance.post('https://1793-2a01-cb19-121-7900-a1bf-5161-4b0c-75f6.ngrok.io/signup', playload);
    return res
}

