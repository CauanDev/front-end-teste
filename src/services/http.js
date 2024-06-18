import axios from 'axios';
const axiosInstance = axios.create({
    baseURL:'https://1079-2804-d59-ad27-b700-440-193-c6ca-97c3.ngrok-free.app/api',
    headers: {
        'Content-type': 'application/json',
        'Authorization': '2qzU0ENAOtmP5yzun4UeIrWv9HvKMhDQMPs54n7mf6498bF7dp4KLaQW3r48pLnDwZkUTYetvzKsGcJ',
        'ngrok-skip-browser-warning': true
    }
});

export default axiosInstance;
