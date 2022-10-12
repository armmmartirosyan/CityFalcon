import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories',
});

class Api {
    static getStories(search){
        return api.get(`${search}`);
    }
}
export default Api;