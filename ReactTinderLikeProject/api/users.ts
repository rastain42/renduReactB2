import axiosApiInstance from 'axios';

export const signIn = async (playload: any) => {
    const res = await axiosApiInstance.post(process.env.NGROK_FORWARD_URL+'/users/login', playload);
    return res
}

export const register = async (playload: any) => {
    console.log("register")
    const res = await axiosApiInstance.post(process.env.NGROK_FORWARD_URL+'/signup', playload);
    return res
}

