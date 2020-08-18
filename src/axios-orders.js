import axios from 'axios'
 
const instance = axios.create({
    baseURL : 'https://bigburger-e4acf.firebaseio.com/'
});

export default instance;