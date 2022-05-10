import axiosApiInstance from 'axios';
import { useSelector } from 'react-redux';

export const signIn = async (playload: any) => {
    const res = await axiosApiInstance.post('https://matcherapi.herokuapp.com/users/login', playload);
    return res
}

export const register = async (playload: any) => {
    const res = await axiosApiInstance.post('https://matcherapi.herokuapp.com/signup', playload);
    return res
}

