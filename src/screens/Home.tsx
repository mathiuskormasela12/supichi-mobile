// ========== Home
// import all modules
import React, {Fragment, useState} from 'react';
import {
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
	Image,
	Platform,
	StatusBar,
	useWindowDimensions,
	StyleSheet,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all screens
import Texts from './Texts';
import Voices from './Voices';

// import all components
import {Container} from '../components';

// import assets
import filterIcon from '../assets/images/filter-icon.png';

const Home: React.FC = () => {
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{
			key: 'texts',
			title: 'Text',
		},
		{
			key: 'voices',
			title: 'Voice',
		},
	]);

	const renderScene = SceneMap({
		texts: Texts,
		voices: Voices,
	});

	return (
		<Fragment>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosStatusBar} />}
			<SafeAreaView style={styled.hero}>
				<StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
				<View style={styled.header}>
					<Container size={80}>
						<Text style={styled.title}>Supichi</Text>
						<TouchableOpacity style={styled.iconControl}>
							<Image source={filterIcon} style={styled.icon} />
						</TouchableOpacity>
					</Container>
				</View>
				<TabView
					navigationState={{index, routes}}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{width: layout.width}}
					renderTabBar={props => (
						<View style={{backgroundColor: Colors.primary}}>
							<Container size={100}>
								<TabBar
									{...props}
									style={styled.navbar}
									inactiveColor={Colors.inactiveColor}
									activeColor={Colors.white}
									indicatorContainerStyle={styled.indicatorContainerStyle}
									indicatorStyle={styled.indicatorStyle}
									labelStyle={styled.labelStyle}
									pressColor="transparent"
								/>
							</Container>
						</View>
					)}
				/>
			</SafeAreaView>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosBottomBar} />}
		</Fragment>
	);
};

export default Home;

const styled = StyleSheet.create({
	iosStatusBar: {
		flex: 0,
		backgroundColor: Colors.primary,
	},
	iosBottomBar: {
		flex: 0,
		backgroundColor: Colors.darker,
	},
	hero: {
		flex: 1,
	},
	header: {
		backgroundColor: Colors.primary,
		paddingVertical: percentageDimensions(3, 'height'),
		position: 'relative',
		justifyContent: 'center',
	},
	title: {
		fontFamily: Fonts.bold,
		color: Colors.white,
		fontSize: 25,
		textAlign: 'center',
	},
	iconControl: {
		position: 'absolute',
		right: 0,
	},
	icon: {
		width: percentageDimensions(6),
		height: percentageDimensions(6),
	},
	labelStyle: {
		textTransform: 'capitalize',
		fontSize: 18,
		fontFamily: Fonts.base,
	},
	navbar: {
		backgroundColor: 'transparent',
		elevation: 0,
	},
	indicatorContainerStyle: {
		backgroundColor: 'transparent',
	},
	indicatorStyle: {
		width: percentageDimensions(27),
		marginLeft: percentageDimensions(12),
		backgroundColor: Colors.white,
	},
});
