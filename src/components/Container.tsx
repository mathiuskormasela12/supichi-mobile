// ========== Container
// import all modules
import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {IContainerProps} from '../interfaces';

const width = Dimensions.get('window').width;

export const Container = ({children, size}: IContainerProps) => (
	<View style={{width: (size / 100) * width, ...styled.container}}>
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
