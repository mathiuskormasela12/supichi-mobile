// ========== StackScreen
// import all modules
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';

// import all screens
import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';

const Stack = createNativeStackNavigator();

const StackScreen: React.FC = () => {
	return (
		<NavigationContainer onReady={() => RNBootSplash.hide()}>
			<Stack.Navigator>
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
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default StackScreen;
