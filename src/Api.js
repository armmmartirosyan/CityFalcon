import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories',
});

class Api {
    static getStories(){
        return api.get('');
    }
}
export default Api;