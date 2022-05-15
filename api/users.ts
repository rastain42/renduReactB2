import axiosApiInstance from 'axios';
import { useSelector } from 'react-redux';
import apiSettings from '.';

export const signIn = async (playload: any) => {
    console.log("OKKk", apiSettings.baseURL)
    console.log(`${apiSettings.baseURL}/users/login`, playload);
    const res = await axiosApiInstance.post(`${apiSettings.baseURL}/users/login`, playload);
    return res
}

export const register = async (playload: any) => {
    const res = await axiosApiInstance.post(`${apiSettings.baseURL}/signup`, playload);
    return res
}

