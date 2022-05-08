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
	IGenerateTextAndVoice,
	IGetUser,
	IUpdateUser,
	IUploadUserPhoto,
} from '../interfaces';
import {generateFormData} from '../helpers';

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

	public static getAllTexts(data: ITextsVoicesGetTextsVoicesQuery) {
		const queries: string = `${Object.keys(data)
			.map((item, index) => `${item}=${Object.values(data)[index]}`)
			.join('&')}`;
		return http().get(`/texts?${queries}`);
	}

	public static getAllVoices(data: ITextsVoicesGetTextsVoicesQuery) {
		const queries: string = `${Object.keys(data)
			.map((item, index) => `${item}=${Object.values(data)[index]}`)
			.join('&')}`;
		return http().get(`/voices?${queries}`);
	}

	public static getText(data: IGetTextVoiceDetail) {
		return http().get(`/text/${data.id}`);
	}

	public static getVoice(data: IGetTextVoiceDetail) {
		return http().get(`/voice/${data.id}`);
	}

	public static generateVoice(data: IGenerateTextAndVoice) {
		const formData = generateFormData(data);
		return http().post('/voice', formData);
	}

	public static generateText(data: IGenerateTextAndVoice) {
		const formData = generateFormData(data);
		return http().post('/text', formData);
	}

	public static deleteText(data: IGetTextVoiceDetail) {
		return http().delete(`/text/${data.id}`);
	}

	public static deleteVoice(data: IGetTextVoiceDetail) {
		return http().delete(`/voice/${data.id}`);
	}

	public static getUser(data: IGetUser) {
		return http().get(`/user/${data.id}`);
	}

	public static updateUser(id: number, data: IUpdateUser) {
		return http().put(`/user/${id}`, data);
	}

	public static uploadUserPhoto(id: number, data: IUploadUserPhoto) {
		const formData = generateFormData(data);
		return http().put(`/user/photo/${id}`, formData);
	}
}

export default Service;
