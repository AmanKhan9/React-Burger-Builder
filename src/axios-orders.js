import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-7cfca.firebaseio.com/'
});

export default instance;