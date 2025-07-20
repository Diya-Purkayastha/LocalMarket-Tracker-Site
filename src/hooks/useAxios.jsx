import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://b11a12-server-side-diya-purkayastha.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;