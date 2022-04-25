// ========== Container
// import all modules
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {percentageDimensions} from '../helpers';
import {IContainerProps} from '../interfaces';

export const Container = ({children, size}: IContainerProps) => (
	<View style={{width: percentageDimensions(size), ...styled.container}}>
		{children}
	</View>
);

Container.defaultProps = {
	size: 90,
};

const styled = StyleSheet.create({
	container: {
		marginTop: 0,
		marginBottom: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});
