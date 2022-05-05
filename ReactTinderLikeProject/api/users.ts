import axiosApiInstance from 'axios';
import { useSelector } from 'react-redux';

const ngrokUrl: string = 'https://4bc6-2a01-e0a-1d1-8260-6593-564-4d0f-ad45.eu.ngrok.io'



export const signIn = async (playload: any) => {
    const res = await axiosApiInstance.post('https://4bc6-2a01-e0a-1d1-8260-6593-564-4d0f-ad45.eu.ngrok.io/users/login', playload);
    return res
}

export const register = async (playload: any) => {
    const res = await axiosApiInstance.post('https://4bc6-2a01-e0a-1d1-8260-6593-564-4d0f-ad45.eu.ngrok.io/signup', playload);
    return res
}

