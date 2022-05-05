// ========== HTTP Service
// import all modules
import axios from 'axios';
import {API_URL} from '@env';
import {HttpFunc, SetTokensAction} from '../types';

const http: HttpFunc = (
	accessToken?: string,
	refreshToken?: string,
	setTokens?: SetTokensAction,
	dispatch?: any,
) => {
	const instances = axios.create({
		baseURL: API_URL,
	});

	if (accessToken && refreshToken && setTokens) {
		instances.interceptors.request.use(
			(config: any) => {
				if (accessToken) {
					config.headers['x-access-token'] = accessToken;
				}
				return config;
			},
			error => {
				return Promise.reject(error);
			},
		);

		instances.interceptors.response.use(
			(res: unknown) => {
				return res;
			},
			async (err: any) => {
				console.log('LIAT INI BRE =>', err.request.status);
				const originalConfig = err.config;
				if (err.response) {
					// Access Token was expired
					if (err.response.status === 403 && !originalConfig._retry) {
						originalConfig._retry = true;
						try {
							const {data} = await instances.post('/auth/access-token', {
								refreshToken,
							});
							dispatch(
								setTokens(data.results.accessToken, data.results.refreshToken),
							);
							return instances(originalConfig);
						} catch (_error: any) {
							console.log(_error);

							dispatch(setTokens(null, null));

							if (_error.response && _error.response.data) {
								return Promise.reject(_error.response.data);
							}
							return Promise.reject(_error);
						}
					}
					if (err.response.status === 400 && err.response.data) {
						return Promise.reject(err.response.data);
					}
				}

				return Promise.reject(err);
			},
		);
	}
	return instances;
};

export default http;
