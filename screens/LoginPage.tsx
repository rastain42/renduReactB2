import { StyleSheet, View, Image, Text} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import LoginScreen from "react-native-login-screen";
import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { login, userSignIn } from '../features/user'
import { persistor, useAppDispatch } from '../features';
import { unwrapResult } from '@reduxjs/toolkit';
import {AsyncStorage} from 'react-native';





export default function Login({navigation}){
  const user = useSelector(state => state.counter);
  
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  
  const userLogin = (email: string, password: string) => {
      const originalPromiseResult = dispatch(userSignIn({email: email, password: password}))  
      .then(unwrapResult)
      .then( (originalPromiseResult) => {
        console.log("Good")

        onNavigateToHome()
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log("OKK")
        // handle result here
        setError("Invalid email or password")
      })
    }
    
    const onNavigateToHome = async () => {
      navigation.navigate("Root");
  };
  const Header = () => {
    return (
      <View >
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      </View>
    );
  }
  return (
    <View style={styles.container2}>
      <Header />
      <TextInput label="Email" value={email} onChangeText={text => setEmail(text)}/>
      <TextInput label="Password" value={password} onChangeText={text => setPassword(text)}/>
      <Text>{error}</Text>
      <Button  mode="contained" onPress={() => userLogin(email, password)}>
        Sign In
      </Button>
    </View>
  )
  
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    height: 128,
    width: 128,
    
  },
  container2: {
  }
});
