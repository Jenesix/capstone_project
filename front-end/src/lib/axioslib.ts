import axios from 'axios';

export const axioslib = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});
