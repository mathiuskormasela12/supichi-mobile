// =========== Texts
// import all modules
import React from 'react';
import {SafeAreaView, Text, SectionList, StyleSheet} from 'react-native';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all components
import {Container, Card} from '../components';

const data = [
	{
		date: 'Today, May 02/2022',
		data: [
			{
				id: 1,
				text: 'What is Javascript?',
				time: '9:00am',
			},
			{
				id: 2,
				text: 'What is Typescript?',
				time: '9:40am',
			},
		],
	},
	{
		date: 'Yesterday',
		data: [
			{
				id: 3,
				text: 'What is Nest Js?',
				time: '11:29am',
			},
			{
				id: 3,
				text: 'What is React Native?',
				time: '12:02pm',
			},
			{
				id: 4,
				text: 'What is Next Js?',
				time: '12:32pm',
			},
			{
				id: 5,
				text: 'Read the book',
				time: '12:42pm',
			},
		],
	},
];

const Texts: React.FC = () => {
	return (
		<SafeAreaView style={styled.hero}>
			<Container>
				<SectionList
					showsVerticalScrollIndicator={false}
					sections={data}
					keyExtractor={(item, index) => String(item.id + index)}
					renderItem={({item}) => (
						<Card text={item.text} time={item.time} type="text" />
					)}
					renderSectionHeader={({section: {date}}) => (
						<Text style={styled.title}>{date}</Text>
					)}
				/>
			</Container>
		</SafeAreaView>
	);
};

export default Texts;

const styled = StyleSheet.create({
	hero: {
		flex: 1,
		backgroundColor: Colors.whiteDark,
		paddingTop: percentageDimensions(2.5, 'height'),
	},
	title: {
		fontFamily: Fonts.bold,
		color: Colors.darkGray,
		fontSize: 15,
		textTransform: 'uppercase',
		marginVertical: percentageDimensions(2, 'height'),
	},
});
