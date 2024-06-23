import axios from 'axios';
const axiosInstance = axios.create({
    baseURL:'https://fa5c-2804-d59-ad27-b700-e764-8d9-c8ce-7f3f.ngrok-free.app/api',
    headers: {
        'Content-type': 'application/json',
    }
});

export default axiosInstance;