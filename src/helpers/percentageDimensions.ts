// =========== Percentage Dimensions
// import all modules
import {Dimensions} from 'react-native';
import {PercentageDimensions} from '../types';

export const percentageDimensions: PercentageDimensions = (
	size: number,
	type?: string,
): number => {
	const dimensions = Dimensions.get('window');

	switch (type) {
		case 'height':
			return (size / 100) * dimensions.height;

		default:
			return (size / 100) * dimensions.width;
	}
};
