import React from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableWithoutFeedback, Dimensions, ListView,
Text } from 'react-native';
import store from '../configs/store';
import { observer } from 'mobx-react/native';
import {database} from '../configs/firebase';


const {width, height} = require('Dimensions').get('window');

@observer
export default class StoryCards extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		if (store.isLoading){
			return (
				<View><Text>LOL</Text></View>
			)
		} else {
			return (
				<View style={styles.container}>
					<View ref='foo'>
						<ScrollView
							// style={styles.bubbles}
							contentContainerStyle={styles.list}
							// horizontal={true}
							showsHorizontalScrollIndicator={false}
						>
							{store.stories.map((story, i) => (
								<View ref={`_${i}`} key={i}>
									<TouchableWithoutFeedback
										activeOpacity={0.9}
										onPress={() => {
											this.refs[`_${i}`].measure((ox, oy, width, height, px, py) => {
												const offset = {
													top: (py + bubbleSize/2),
													left: (px + bubbleSize/2)
												};
												store.fetchMoments(database.ref('/moments/'+story.key))
												if (store.isLoading == false) {
													store.openCarousel(i, offset, story);
												}
											});
										}}
									>
										<View>
											<Image style={styles.img} source={{ uri: story.avatar }}>
												<View style={styles.innerFrame}>
										        <Text style={styles.universityName}>{story.title}</Text>
														<ScrollView horizontal={true}>
															<Image style={styles.avatar} source={{ uri: story.user.avatar_url }} />
															<Text style={styles.universityMotto}> {story.user.name}</Text>
														</ScrollView>
										    </View>
											</Image>
											{/* <Text>{story.user.avatar_url}</Text> */}
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
		flexDirection: 'row',
    flexWrap: 'wrap'
	},
	bubbles: {
		height: 500,
		// paddingHorizontal: 5,
		backgroundColor: '#f3f3f3',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#ccc',
		overflow: 'visible',
		// width: width,
	},
	img: {
		// borderWidth: 2,
		// borderColor: '#fff',
		// width: bubbleSize,
		// height: bubbleSize,
		// borderRadius: bubbleSize/2,
		borderRadius: 2,
		opacity: 0.5, backgroundColor: 'black',
		width: width/2 - 5,
		height: height/2-50,
		// marginHorizontal: 10,
		marginLeft: 5,
		marginTop: 5,
    // width: 500,
    // height: 500,
	},
	innerFrame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .6)',
		opacity: 1,
	},
	universityName: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 15,
    backgroundColor: 'transparent'
	},
	universityMotto: {
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'transparent'
	},
	avatar: {
		width: 20,
		height: 20,
		borderRadius: 10,
	}
});
