// ========== IGenerateTextAndVoice
// import all modules
import {RenderFromType} from '../types';

export interface IGenerateTextAndVoice {
	language: string;
	renderFrom: RenderFromType;
	photo: {
		uri: string;
		name: string;
		type: string;
	};
}
