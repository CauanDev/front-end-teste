import axios from 'axios';
const axiosInstance = axios.create({
    baseURL:'https://1079-2804-d59-ad27-b700-440-193-c6ca-97c3.ngrok-free.app/api',
    headers: {
        'Content-type': 'application/json'
    }
});

export default axiosInstance;