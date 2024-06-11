import axios from 'axios';
const axiosInstance = axios.create({
    baseURL:'https://api-diagnostico.dourasoft.com.br/api',
    headers: {
        'Content-type': 'application/json'
    }
});

export default axiosInstance;