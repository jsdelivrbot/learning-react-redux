import axios from 'axios';

const instance = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'Some TOKEN from AXIOS INSTANCE';

export default instance;