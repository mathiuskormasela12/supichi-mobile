// ========== Container
// import all modules
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {percentageDimensions} from '../helpers';
import {IContainerProps} from '../interfaces';

export const Container = ({children, size, relative}: IContainerProps) => {
	const styles: any = {
		width: percentageDimensions(size),
		position: relative ? 'relative' : 'static',
		...styled.container,
	};

	return <View style={styles}>{children}</View>;
};

Container.defaultProps = {
	size: 90,
	relative: false,
	fullHeight: false,
};

const styled = StyleSheet.create({
	container: {
		marginTop: 0,
		marginBottom: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});
