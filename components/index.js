import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ListView,
  StyleSheet, UIManager, Platform, Dimensions
} from 'react-native';
import { observer } from 'mobx-react/native';
import Stories from './stories';
import store from './store';
import Bubbles from './bubbles';
import { BottomNavigation,COLOR, ThemeProvider } from 'react-native-material-ui';

const { width, height } = Dimensions.get('window');

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

@observer
export default class TripBook extends Component {
  constructor(props) {
      super(props)
      this.state = {
          active: true
      }
  }

	componentWillMount() {
		if (Platform.OS == 'android')
			UIManager.setLayoutAnimationEnabledExperimental(true);
	}

	render() {
		return (
			<View style={styles.container}>
				<Bubbles />

				<View style={[
					styles.carouselWrap,
					store.offset,
					(store.carouselOpen ? styles.open : styles.closed)
				]}>
					<Stories />
				</View>

        <ThemeProvider uiTheme={uiTheme}>
        <BottomNavigation active={this.state.active} hidden={false} >
            <BottomNavigation.Action
                key="today"
                icon="today"
                label="Today"
                onPress={() => this.setState({ active: 'today' })}
            />
            <BottomNavigation.Action
                key="people"
                icon="people"
                label="People"
                onPress={() => this.setState({ active: 'people' })}
            />
            <BottomNavigation.Action
                key="bookmark-border"
                icon="bookmark-border"
                label="Bookmark"
                onPress={() => this.setState({ active: 'bookmark-border' })}
            />
            <BottomNavigation.Action
                key="settings"
                icon="settings"
                label="Settings"
                onPress={() => this.setState({ active: 'settings' })}
            />
        </BottomNavigation>
        </ThemeProvider>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	carouselWrap: {
		overflow: 'hidden',
		position: 'absolute',
	},
	closed: {
		width: 0,
		height: 0,
	},
	open: {
		width, height,
		top: 0,
		left: 0,
	},

	btn: {
		width: 40,
		height: 40,
		borderRadius: 40/2,
		backgroundColor: 'black',
	},
});

// BottomNavigation
const propTypes = {
    /**
    * The key of selected/active tab
    */
    active: PropTypes.string,
    /**
    * True if the action is active (for now it'll be highlight by primary color)
    */
    active: PropTypes.bool.isRequired,
    /**
    * Will be rendered above the label as a content of the action.
    */
    icon: PropTypes.string.isRequired,
    /**
    * Will be rendered under the icon as a content of the action.
    */
    label: PropTypes.string,
    /**
    * BottomNavigation.Action nodes
    */
    children: PropTypes.node.isRequired,
    /**
    * Wether or not the BottomNaviagtion should show
    */
    hidden: PropTypes.bool, /* DEFAULT: false */
    /**
    * Callback for on press event.
    */
    onPress: PropTypes.func,
    /*
    * Inline style of bottom navigation
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        active: Text.propTypes.style,
        disabled: Text.propTypes.style
    }),
};
