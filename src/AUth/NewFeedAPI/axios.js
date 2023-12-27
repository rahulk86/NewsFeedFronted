import axios from 'axios';
import urls from './NewFeedUrl';


export default axios.create({
    baseURL:urls.baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL:urls.baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});