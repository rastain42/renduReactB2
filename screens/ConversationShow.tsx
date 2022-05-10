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
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import route  from '@react-navigation/native';
export default function ConversationShowScreen({route }) {

  const { conversation } = route?.params;
  const user = useSelector((state) => state.user.value);
  console.log("CONV", user)

  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const messages = await axios.get('https://matcherapi.herokuapp.com/' + '/conversations/' + conversation.id + '/messages')
    const mess = messages.data.map((m: any) => {
      m['_id'] = m.id
      m['text'] = m.content
      m['user'] = {
        _id: m.author,
        name: "TM",
        avatar: "https://bootdey.com/img/Content/avatar/avatar7.png"
      }
    })
    setMessages(messages.data.reverse())
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      getMessages()
    } , 10000)
    return () => clearTimeout(timer);
  }, [getMessages])

  
  const sendMessage = async(message: any) => {
    const playload = {
      "content": `${message?.text}`,
      "author": `${user.id}`,
      "conversationId": `${conversation.id}`,
      "additionalProp1": {}
    }
    console.log(playload)
    try {
      const returnedMessage = await axios.post('https://matcherapi.herokuapp.com/' + '/conversations/' +conversation.id + '/messages', playload)
      return returnedMessage
    } catch (error) {
      console.log(error)
    }
  }
 
  const onSend = useCallback((messages = []) => {
    console.log(messages)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    sendMessage(messages[0])

  }, [])
 
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.id,
      }}
      renderBubble={props => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: 'white',
              },
            }}
          />
        );
      }}
      showAvatarForEveryMessage={false}
    />
  )

 
}
