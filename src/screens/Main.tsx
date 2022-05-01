// ========== Main
// import all modules
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import all screen
import Home from './Home';
import Profile from './Profile';

// import all components
import {BottomTabs} from '../components';

const Tab = createBottomTabNavigator();

const Main: React.FC = () => {
	return (
		<Tab.Navigator tabBar={props => <BottomTabs {...props} />}>
			<Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{headerShown: false}}
			/>
		</Tab.Navigator>
	);
};

export default Main;
