import axiosApiInstance from 'axios';

export const signIn = async (playload: any) => {
    const res = await axiosApiInstance.post('https://9cf5-2a01-cb19-121-7900-58f7-3740-d5ff-aa48.ngrok.io/users/login', playload);
    return res
}
