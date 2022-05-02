import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { whoami } from '../api/users';
import Swiper  from 'react-native-deck-swiper';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import {  Button , Image, ImageBackground} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditScreenInfo({ path }: { path: string }) {
  const user = useSelector((state) => state.user.value);


  const [users, setusers] = useState([]);
  const [usersLength, setusersLength] = useState([]);


  const getCardsLength = (size: number) => {
    const res: any = []
    for(let i = 0; i < size  ; i++) {
      res.push(i);
    }
    return res
  }
  

  const getUsers = async () => {
    const result = await  axios.get('https://8ec2-77-196-149-138.eu.ngrok.io' + '/users/')
    result.data.map((user: any) => {
    })
  

    setusers(result.data)
  }
  useEffect(() => {
    // if(users.length === 0) {
      getUsers()
      // getCardsLength(users.length)
      setusersLength(getCardsLength(users.length))
    }, [2]);

    const match = async (userId: string) => {
      const result = await  axios.post('https://8ec2-77-196-149-138.eu.ngrok.io' + '/meets/', {
          "usersIds": ["2b2509d9-1cb3-42b3-bffe-2a000b4ef6a2", userId]
      })
      if(result.data.matched == true) {
      }
    }

  const image = { uri: "https://i.pinimg.com/originals/92/f0/ed/92f0edd9b0ecefdd5b7a48b8e1f7d340.jpg" };
if(users.length === 0) {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>
        Loading
      </Text>
    </View>
  );
} else {
  return (
      <View style={styles.container}>
        <Swiper
            cards={getCardsLength(users.length)}
            renderCard={(card: number) => {
            
                const image = { uri: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg" };
                return (
                  <View style={styles.card}>
                      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                      <Text style={styles.text}>{users[card].name}</Text>
                     </ImageBackground>
                  </View>
              )
            }}
            onSwipedRight={(cardIndex) => {match(users[cardIndex].id)}}
            onSwipedAll={() => {
              return (
                <View style={styles.container}>
                  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                  <Text style={styles.title}>
                    Swiped all cards
                  </Text>
                </View>
              )
            }}
            cardIndex={0}
            marginBottom={140}
            marginTop={10}
            backgroundColor={'#FFFFFF'}
            stackSize= {10}>
        </Swiper>
      </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
    backgroundColor: "#FFFFFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "#966ed7",
    margin: 12,
  },
  tinyLogo: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
}
});
