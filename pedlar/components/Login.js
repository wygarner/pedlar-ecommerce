import 'react-native-gesture-handler';
import React from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


const apiUrl = "http://10.0.0.14:3000/graphql"

class LoginScreen extends React.Component {
    state = {
      username: '',
      phoneNumber: '',
      password: '',
    }
    storeData = async (value, key) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
          console.log(e)
        }
    }
    handleUsername = (text) => {
      this.setState({ username: text })
    }
    handlePhoneNumber = (text) => {
      this.setState({ phoneNumber: text })
    }
    handlePassword = (text) => {
      this.setState({ password: text })
    }
    login = (username, phone, pass) => {
      let requestBody = {
        query: `
          query {
            login(username: "${username}", phone: "${phone}", password: "${pass}") {
              userId
              token
              tokenExpiration
            }
          }
        `
      }
  
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log("LOGIN STATUS:", res.status)
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
            tokenData: resData
        })
        const username = this.state.username
        const phoneNumber = this.state.phoneNumber
        const password = this.state.password
        const loginData = {password, phoneNumber, username}
        this.storeData(loginData, 'loginData')
        this.storeData(this.state.tokenData, 'tokenData')
        this.props.navigation.push('Home')
      })
      .catch(err => {
        console.log(err);
      });
    }
    
    register = (username, phone, pass) => {
      let requestBody = {
        query: `
          mutation {
            createUser(userInput: {username: "${username}", phone: "${phone}", password: "${pass}"}) {
              _id
              username
              phone
            }
          }
        `
      };
  
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          console.log("RESPONSE STATUS: ",res.status)
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
    }
  
    render() {
      return (
        <View style = {styles.container}>
          <TextInput style = {styles.input}
            placeholder = "Username"
            placeholderTextColor = "#444"
            autoCapitalize = "none"
            onChangeText = {this.handleUsername}/>
  
          <TextInput style = {styles.input}
            placeholder = "Phone Number"
            placeholderTextColor = "#444"
            autoCapitalize = "none"
            onChangeText = {this.handlePhoneNumber}/>
          
          <TextInput style = {styles.input}
            placeholder = "Password"
            placeholderTextColor = "#444"
            autoCapitalize = "none"
            onChangeText = {this.handlePassword}/>
          <TouchableOpacity
            style = {styles.submitButton}
            onPress = {() => {
              this.login(this.state.username, this.state.phoneNumber, this.state.password)
            }}>
            <Text style = {styles.submitButtonText}> Log in </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.submitButton}
            onPress = {
              () => this.register(this.state.username, this.state.phoneNumber, this.state.password)
            }>
            <Text style = {styles.submitButtonText}> Register </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

export default LoginScreen;