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
