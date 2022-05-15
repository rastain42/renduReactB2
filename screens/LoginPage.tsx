import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import LoginScreen from "react-native-login-screen";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login, userSignIn } from '../features/user'
import { persistor, useAppDispatch } from '../features';
import { unwrapResult } from '@reduxjs/toolkit';
import {AsyncStorage} from 'react-native';
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { geolocFinder } from '../helpers/localisation';






export default function Login({navigation}){
  const user = useSelector(state => state.user);
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const dispatch = useAppDispatch();
  const loc = geolocFinder();
  console.log("LOXX", loc)

  
  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    const originalPromiseResult = dispatch(userSignIn({email: email.value, password: password.value, location:loc}))  
    .then(unwrapResult)
    .then( (originalPromiseResult) => {
      onNavigateToHome()
    })
    .catch((rejectedValueOrSerializedError) => {
      setError("Invalid email or password")
    })
    
  }
  
  const [error, setError] = React.useState("");
  const onNavigateToHome = async () => {
    navigation.navigate("Root");
  };
  return (
    <Background>
    <BackButton goBack={navigation.goBack} />
    <Logo />
    <Header>Welcome back.</Header>
    <TextInput
      label="Email"
      returnKeyType="next"
      value={email.value}
      onChangeText={(text) => setEmail({ value: text, error: '' })}
      error={!!email.error}
      errorText={email.error}
      autoCapitalize="none"
      autoCompleteType="email"
      textContentType="emailAddress"
      keyboardType="email-address"
    />
    <TextInput
      label="Password"
      returnKeyType="done"
      value={password.value}
      onChangeText={(text) => setPassword({ value: text, error: '' })}
      error={!!password.error}
      errorText={password.error}
      secureTextEntry
    />
    <View style={styles.forgotPassword}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ResetPasswordScreen')}
      >
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
    <Button mode="contained" onPress={onLoginPressed}>
      Login
    </Button>
    <View style={styles.row}>
      <Text>Don’t have an account? </Text>
      <TouchableOpacity onPress={() => navigation.replace('Register')}>
        <Text style={styles.link}>Sign up</Text>
      </TouchableOpacity>
    </View>
  </Background>
  )
  
  
}


const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
