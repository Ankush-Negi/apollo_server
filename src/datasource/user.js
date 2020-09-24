import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configuration';

export default class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${config.serviceUrl}/api/user`;
    }
    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }
    async getMe() {
         const response = await this.get('/me');
         console.log('value of response', response);
         return response
    }
    async loginUser(payload) {
        const response = await this.post('/login', payload);
        const { data } = response;
        return data;
    }
    async signUpUser(payload) {
        try{
            const response = await this.post('/signup', {...payload});
            const { data } = response;
            return data;
        } catch(error){
            console.log('Error: ', error);
        }

    }
}