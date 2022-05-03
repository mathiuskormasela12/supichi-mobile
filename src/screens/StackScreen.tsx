// ========== StackScreen
// import all modules
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// import all screens
import Welcome from './Welcome';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ResetPasswordConfirmation from './ResetPasswordConfirmation';
import Main from './Main';

const Stack = createNativeStackNavigator();

const StackScreen: React.FC = () => {
	return (
		<GestureHandlerRootView style={styled.gestureHandleRootView}>
			<NavigationContainer onReady={() => RNBootSplash.hide()}>
				<Stack.Navigator
					screenOptions={{
						animation: 'slide_from_right',
						fullScreenGestureEnabled: true,
					}}>
					<Stack.Screen
						name="Welcome"
						component={Welcome}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name="SignIn"
						component={SignIn}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name="SignUp"
						component={SignUp}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name="ForgotPassword"
						component={ForgotPassword}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name="ResetPassword"
						component={ResetPassword}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name="ResetPasswordConfirmation"
						component={ResetPasswordConfirmation}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name="Main"
						component={Main}
						options={{headerShown: false}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
};

export default StackScreen;

const styled = StyleSheet.create({
	gestureHandleRootView: {
		flex: 1,
	},
});
