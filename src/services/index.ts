// ========== Services
// import all modules
import http from './http';
import {
	ILoginBody,
	IRegisterBody,
	ISendResetPasswordOtpBody,
	IResetPasswordBody,
	ITextsVoicesGetTextsVoicesQuery,
	IGetTextVoiceDetail,
} from '../interfaces';
import {SetTokensAction} from '../types';

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

	public static getAllTexts(
		accessToken: string,
		refreshToken: string,
		setToken: SetTokensAction,
		data: ITextsVoicesGetTextsVoicesQuery,
		dispatch?: any,
	) {
		const queries: string = `${Object.keys(data)
			.map((item, index) => `${item}=${Object.values(data)[index]}`)
			.join('&')}`;
		return http(accessToken, refreshToken, setToken, dispatch).get(
			`/texts?${queries}`,
			data,
		);
	}

	public static getAllVoices(
		accessToken: string,
		refreshToken: string,
		setToken: SetTokensAction,
		data: ITextsVoicesGetTextsVoicesQuery,
		dispatch?: any,
	) {
		const queries: string = `${Object.keys(data)
			.map((item, index) => `${item}=${Object.values(data)[index]}`)
			.join('&')}`;
		return http(accessToken, refreshToken, setToken, dispatch).get(
			`/voices?${queries}`,
			data,
		);
	}

	public static getText(
		accessToken: string,
		refreshToken: string,
		setToken: SetTokensAction,
		data: IGetTextVoiceDetail,
		dispatch?: any,
	) {
		return http(accessToken, refreshToken, setToken, dispatch).get(
			`/text/${data.id}`,
			data,
		);
	}

	public static getVoice(
		accessToken: string,
		refreshToken: string,
		setToken: SetTokensAction,
		data: IGetTextVoiceDetail,
		dispatch?: any,
	) {
		return http(accessToken, refreshToken, setToken, dispatch).get(
			`/voice/${data.id}`,
			data,
		);
	}
}

export default Service;
