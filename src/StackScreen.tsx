// ========== StackScreen
// import all modules
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';

// import all screens
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';

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
					name="Login"
					component={Login}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="Register"
					component={Register}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default StackScreen;
