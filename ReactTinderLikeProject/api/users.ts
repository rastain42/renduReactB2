import axiosApiInstance from 'axios';
import { useSelector } from 'react-redux';

const ngrokUrl: string = 'https://a8ac-2a01-e0a-1d1-8260-90c9-71e8-e3ea-9c84.eu.ngrok.io'



export const signIn = async (playload: any) => {
    const res = await axiosApiInstance.post('https://a8ac-2a01-e0a-1d1-8260-90c9-71e8-e3ea-9c84.eu.ngrok.io/users/login', playload);
    return res
}

export const register = async (playload: any) => {
    const res = await axiosApiInstance.post('https://a8ac-2a01-e0a-1d1-8260-90c9-71e8-e3ea-9c84.eu.ngrok.io/signup', playload);
    return res
}

