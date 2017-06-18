import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions
} from 'react-native';

import * as firebase from 'firebase';
import config from '../../configs/firebase';

const firebaseApp = firebase.initializeApp(config);

import {FBLogin, FBLoginManager} from 'react-native-facebook-login'

export default class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    // Sign or Create user in Firebase
    // returns a promise
    signInWithProvider(provider, token) {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebaseApp
        .auth()
        .signInWithCredential(credential)
        .then(() => alert('Account accepted'))
        .catch((error) => alert('Account disabled'));
    }

    render() {

        let _this = this

        return (
            <FBLogin style={styles.viewContainer}
              ref={(fbLogin) => { this.fbLogin = fbLogin }}
              permissions={["email","user_friends"]}
              loginBehavior={FBLoginManager.LoginBehaviors.Native}

              onLogin={(data) => {
                  _this.signInWithProvider('facebook', data.credentials.token);
                  _this.setState({ user : data.credentials });
              }}

              onLogout={function(){
                console.log("Logged out.");
                _this.setState({ user : null });
              }}

              onLoginFound={function(data){
                console.log("Existing login found.");
                console.log(data.credentials.token);
                _this.signInWithProvider('facebook', data.credentials.token);
                _this.setState({ user : data.credentials });
              }}

              onLoginNotFound={function(){
                console.log("No user logged in.");
                _this.setState({ user : null });
              }}

              onError={function(data){
                console.log("ERROR");
                console.log(data);
              }}

              onCancel={function(){
                console.log("User cancelled.");
              }}

              onPermissionsMissing={function(data){
                console.log("Check permissions!");
                console.log(data);
              }}

            />
        )

    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    centering: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', padding: 8,
    position: 'absolute',
    top: Dimensions.get('window').height * .45,
    left: Dimensions.get('window').width * .280,
    zIndex: 10
  },

});
