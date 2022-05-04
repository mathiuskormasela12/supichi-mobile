// ========== Services
// import all modules
import http from './http';
import {ILoginBody, IRegisterBody} from '../interfaces';

class Service {
	public static login(data: ILoginBody) {
		return http().post('/auth/login', data);
	}

	public static register(data: IRegisterBody) {
		return http().post('/auth/register', data);
	}
}

export default Service;
