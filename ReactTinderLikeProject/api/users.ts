import axiosApiInstance from 'axios';
import { useSelector } from 'react-redux';

export const signIn = async (playload: any) => {
    const res = await axiosApiInstance.post('https://8ec2-77-196-149-138.eu.ngrok.io/users/login', playload);
    return res
}

export const register = async (playload: any) => {
    const res = await axiosApiInstance.post('https://8ec2-77-196-149-138.eu.ngrok.io/signup', playload);
    return res
}

