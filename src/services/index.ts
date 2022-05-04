// ========== Services
// import all modules
import http from './http';
import {
	ILoginBody,
	IRegisterBody,
	ISendResetPasswordOtpBody,
	IResetPasswordBody,
} from '../interfaces';

class Service {
	public static login(data: ILoginBody) {
		return http().post('/auth/login', data);
	}

	public static register(data: IRegisterBody) {
		return http().post('/auth/register', data);
	}

	public static sendResetPasswordOtp(data: ISendResetPasswordOtpBody) {
		return http().post('/auth/otp', data);
	}

	public static resetPassword(data: IResetPasswordBody) {
		return http().put('/auth/password', data);
	}
}

export default Service;
