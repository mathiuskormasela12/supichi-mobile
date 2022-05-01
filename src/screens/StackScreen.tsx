// ========== StackScreen
// import all modules
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';

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
	);
};

export default StackScreen;
