// ========== StackScreen
// import all modules
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';

// import all screens
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const StackScreen: React.FC = () => {
	return (
		<NavigationContainer onReady={() => RNBootSplash.hide()}>
			<Stack.Navigator>
				<Stack.Screen
					name="WelcomeScreen"
					component={WelcomeScreen}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default StackScreen;
