import axiosApiInstance from 'axios';
import { useSelector } from 'react-redux';

export const signIn = async (playload: any) => {
    const res = await axiosApiInstance.post('https://9c88-2a01-cb19-121-7900-fdc1-5d70-7650-dcc3.ngrok.io/users/login', playload);
    return res
}

export const register = async (playload: any) => {
    const res = await axiosApiInstance.post('https://9c88-2a01-cb19-121-7900-fdc1-5d70-7650-dcc3.ngrok.io/signup', playload);
    return res
}

