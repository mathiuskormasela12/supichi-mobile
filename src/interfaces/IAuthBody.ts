// ========== IAuthBody

export interface ILoginBody {
	username: string;
	password: string;
}

export interface IRegisterBody {
	fullName: string;
	username: string;
	password: string;
}

export interface ISendResetPasswordOtpBody {
	username: string;
}

export interface IResetPasswordBody {
	resetCode: string;
	newPassword: string;
	confirmPassword: string;
}
