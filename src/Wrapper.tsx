// ========== Wrapper
// import all modules
import React, {Fragment, useEffect} from 'react';
import {View, ActivityIndicator, BackHandler, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import StackScreen from './screens/StackScreen';
import {Colors} from './themes';

const Wrapper: React.FC = () => {
	const loading: boolean = useSelector(
		(currentState: any) => currentState.loading.loading,
	);

	useEffect(() => {
		const backAction = (): boolean => {
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		return backHandler.remove();
	}, []);

	return (
		<Fragment>
			<StackScreen />
			{loading && (
				<View style={styled.wrapperContainer}>
					<ActivityIndicator size="large" color={Colors.primary} />
				</View>
			)}
		</Fragment>
	);
};

export default Wrapper;

const styled = StyleSheet.create({
	wrapperContainer: {
		justifyContent: 'center',
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});
