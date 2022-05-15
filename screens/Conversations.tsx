import * as WebBrowser from 'expo-web-browser';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { whoami } from '../api/users';
import Swiper  from 'react-native-deck-swiper';
import AnimatedLoader from "react-native-animated-loader";

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from '../components/Themed';
import {  Button , Image, ImageBackground} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import Loader from '../components/Loader';
import apiSettings from '../api';

export default function ConversationScreen({navigation}) {
  const [conversations, setConversations] = useState([]);
  const user = useSelector((state) => state.user.value);

  const getConversations = async () => {
    const conversations = await axios.get(`${apiSettings.baseURL}` + '/users/' + user.id + '/conversations')
    setConversations(conversations.data)
 
}

useEffect(() => {
      
  getConversations()
        
    
    // Create an scoped async function in the hook
  }, []);

 if(conversations && conversations.length === 0) {
  return (
    <View style={styles.container}>
          <Loader />
          <Text> You don't have any users left</Text>
    </View>
);

 } else {
   console.log(conversations.length)
  const renderItem = ({item}) => {
    let name = ''
    let image = ''
    item.users.forEach((u: any) => {
      if(u.id !== user.id) {
        name = u.name
        image = u.image
        if (!u.image) {
          image = "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
        }
      }
      console.log(image)
    })
    const onNavigateToHome = async () => {
      navigation.navigate("Chat");
    };
    return (
      <TouchableOpacity style={styles.container} onPress={ () => {navigation.navigate("Chat", {
        conversation: item
      })}}>
        <View style={styles.row}>
          <Image source={{ uri: image }} style={styles.pic} />

          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{ name}</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>active</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
      return(
        <View style={{ flex: 1 }} >
          <FlatList 
            extraData={conversations}
            data={conversations}
            keyExtractor = {(item) => {
              return item.id;
            }}
            renderItem={renderItem}/>
        </View>
      );

}
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
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
  },
});