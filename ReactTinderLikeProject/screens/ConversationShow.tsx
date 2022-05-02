import * as WebBrowser from 'expo-web-browser';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { whoami } from '../api/users';
import Swiper  from 'react-native-deck-swiper';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from '../components/Themed';
import {  Button , Image, ImageBackground} from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import route  from '@react-navigation/native';
export default function ConversationShowScreen({route }) {

  const { conversation } = route?.params;
  const user = useSelector((state) => state.user.value);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date() as any,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  
  const sendMessage = async(message: string) => {
    const playload = {
      "content": `${message}`,
      "author": `${user.id}`,
      "conversationId": "string",
      "additionalProp1": {}
    }
    const conversations = await axios.post('https://8ec2-77-196-149-138.eu.ngrok.io' + '/conversations/' +conversation.id + '/messages')

  }
 
  const onSend = useCallback((messages = []) => {
    console.log(messages)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

  }, [])
 
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      showAvatarForEveryMessage={false}
    />
  )
  
 
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  }
});