// ========== WelcomeScreen
// import all modules
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {setTokens} from '../redux/actions/auth';
import {Fonts} from '../themes';

const WelcomeScreen: React.FC = () => {
	const dispatch = useDispatch();
	const accessToken = useSelector((states: any) => states.auth.accessToken);

	const handleClick = () => {
		if (accessToken) {
			dispatch(setTokens(null, null));
		} else {
			dispatch(setTokens(String(Date.now()), String(Date.now())));
		}
	};

	return (
		<SafeAreaView>
			<Text style={styled.text} onPress={handleClick}>
				Click Me
			</Text>
			{accessToken && <Text>Ada Token</Text>}
		</SafeAreaView>
	);
};

export default WelcomeScreen;

const styled = StyleSheet.create({
	text: {
		color: 'red',
		fontSize: 20,
		fontFamily: Fonts.regular,
	},
});
