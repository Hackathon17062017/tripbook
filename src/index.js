import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import Home from './screens/home';

export default class TripBook extends Component {
	render() {
		return (
			<View style={styles.container}>
        <Home/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});
