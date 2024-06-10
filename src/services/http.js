import axios from 'axios';
const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    headers: {
        'Content-type': 'application/json',
        'Authorization': '6b7f33821a2c060ecdd81aefddea2fd3c4720270e18654f4cb08ece49ccb469f8beeee7c831206bd577f9f2630d9177979203a9489e47e04df4e6deaa0f8e0c0'
    }
});

export default axiosInstance;
