import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = "http://10.0.0.14:3000/graphql"

class SplashScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      tokenData: null,
      loginData: null
    }
  }

  componentDidMount= async() => {
    this.getData('tokenData')
    .then((tokenData) => {
      this.setState({
        tokenData: JSON.parse(tokenData)
      })
    })
    this.getData('loginData')
    .then((loginData) => {
      this.setState({
        loginData: JSON.parse(loginData)
      })
    })
    .then(() => {
      // console.log(this.state.tokenData)
      // console.log(this.state.loginData)
      if (this.state.loginData !== null) {
        this.login()
      }
    })
  }

  getData = async(key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue
    } catch(e) {
        console.log(e)
    }
  }

  storeData = async (value, key) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  login() {
    const username = this.state.loginData.username
    const phone = this.state.loginData.phoneNumber
    const pass = this.state.loginData.password
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
      } else {
        this.props.navigation.push('Login')
      }
      return res.json();
    })
    .then(resData => {
      this.setState({
          tokenData: resData
      })
      this.storeData(this.state.tokenData, 'tokenData')
      this.props.navigation.push('Home')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SUPER COOL LOGO</Text>
      </View>
    );
  }
}

export default SplashScreen;