import * as WebBrowser from 'expo-web-browser';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { whoami } from '../api/users';
import Swiper  from 'react-native-deck-swiper';
import TextInput from '../components/TextInput'


import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from '../components/Themed';
import {  Image, ImageBackground} from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Button from '../components/Button'
import React from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import route  from '@react-navigation/native';
import apiSettings from '../api';
import { theme } from '../core/theme'
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { Picker } from '@react-native-picker/picker';
import user from '../features/user';



export default function EditUser ({navigation }) {
  const user = useSelector((state) => state.user.value);
  const [name, setName] = useState({ value: `${user.name}`, error: '' })
  const [image, setImage] = useState({ value: 'https://...', error: '' })
  const [selectLocationLimit, setLocationLimit] = useState("50");

  
  const editUser = async () => {
    const playload = {
      "name": `${name.value}`,
      "image": `${image.value}`,
      "locationLimit": parseInt(selectLocationLimit),
    }
    console.log(playload)
    try {
      const returnedMessage = await axios.patch(`${apiSettings.baseURL}/users/` + user.id , playload)
      navigation.goBack()
      return returnedMessage
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
    <Header>Edit your profile</Header>
    <TextInput
      label="Name"
      returnKeyType="next"
      value={name.value}
      onChangeText={(text) => setName({ value: text, error: '' })}
      error={!!name.error}
      errorText={name.error}
      autoCapitalize="none"
      autoCompleteType="email"
      textContentType="emailAddress"
      keyboardType="email-address"
    />
    <TextInput
      label="Image"
      returnKeyType="done"
      value={image.value}
      onChangeText={(text) => setImage({ value: text, error: '' })}
    />
    <Text> Choose the distance between you and the users you want to see</Text>
    <Picker
  selectedValue={selectLocationLimit}
  onValueChange={(itemValue, itemIndex) =>
    setLocationLimit(itemValue)
  }>
  <Picker.Item label="20 km" value="20" />
  <Picker.Item label="50 km" value="50" />
  <Picker.Item label="100 km" value="100" />
  <Picker.Item label="150 km" value="150" />

</Picker>
    <Button mode="contained" onPress={editUser}>
      Submit your changes
    </Button>
  </View>
  )

 
 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
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

