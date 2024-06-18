import axios from 'axios';
const axiosInstance = axios.create({
    baseURL:'https://454b-2804-d59-ad27-b700-55a9-256c-8ebe-b031.ngrok-free.app',
    headers: {
        'Content-type': 'application/json'
    }
});

export default axiosInstance;