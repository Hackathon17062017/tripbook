import React from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableWithoutFeedback, Dimensions,
Text } from 'react-native';
import store from '../configs/store';

const {width, height} = require('Dimensions').get('window');

export default class StoryCards extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<View ref='foo'>
					<ScrollView
						// style={styles.bubbles}
						contentContainerStyle={styles.list}
						// horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						{this.props.stories.map((story, i) => (
							<View ref={`_${i}`} key={i}>
								<TouchableWithoutFeedback
									activeOpacity={0.9}
									onPress={() => {
										this.refs[`_${i}`].measure((ox, oy, width, height, px, py) => {
											const offset = {
												top: (py + bubbleSize/2),
												left: (px + bubbleSize/2)
											};

											store.openCarousel(i, offset);
										});
									}}
								>
									<View>
										<Image style={styles.img} source={{ uri: story.avatar }} />
										<Text>{story.title}</Text>
									</View>

								</TouchableWithoutFeedback>
							</View>
						))}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const bubbleSize = 70;

const styles = StyleSheet.create({
	container: {
		flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
	},
	list: {
		flexDirection: 'column',
    flexWrap: 'wrap'
	},
	bubbles: {
		height: 500,
		paddingHorizontal: 5,
		backgroundColor: '#f3f3f3',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#ccc',
		overflow: 'visible',
		// width: width,
	},
	img: {
		borderWidth: 2,
		borderColor: '#fff',
		// width: bubbleSize,
		// height: bubbleSize,
		// borderRadius: bubbleSize/2,
		width: width/2 - 30,
		height: height/3-20,
		marginHorizontal: 10,
		margin: 10,
    // width: 500,
    // height: 500,
	},
});
